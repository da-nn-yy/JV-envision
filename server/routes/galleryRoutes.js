const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const {
  createImage,
  getAllImages,
  getImageById,
  updateImage,
  deleteImage,
  getImagesByCategory,
  bulkCreateImages
} = require('../models/Gallery');

const router = express.Router();

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, `image-${uniqueSuffix}${ext}`);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Only image files (jpeg, jpg, png, gif, webp) are allowed!'));
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: fileFilter
});

// Serve uploaded images statically
router.use('/uploads', express.static(uploadsDir));

/**
 * GET /api/gallery
 * Get all images, optionally filtered by category
 */
router.get('/', async (req, res) => {
  try {
    const { category, active_only } = req.query;
    const activeOnly = active_only !== 'false';
    const images = await getAllImages(category || null, activeOnly);

    res.json({
      success: true,
      count: images.length,
      data: images
    });
  } catch (error) {
    console.error('Error fetching images:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch images',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

/**
 * GET /api/gallery/category/:category
 * Get images by category
 */
router.get('/category/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const images = await getImagesByCategory(category);

    res.json({
      success: true,
      count: images.length,
      data: images
    });
  } catch (error) {
    console.error('Error fetching images by category:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch images',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

/**
 * GET /api/gallery/:id
 * Get a single image by ID
 */
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const image = await getImageById(id);

    if (!image) {
      return res.status(404).json({
        success: false,
        message: 'Image not found'
      });
    }

    res.json({
      success: true,
      data: image
    });
  } catch (error) {
    console.error('Error fetching image:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch image',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

/**
 * POST /api/gallery
 * Create a new image (with file upload)
 */
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { title, description, category, display_order, is_active } = req.body;

    if (!title) {
      return res.status(400).json({
        success: false,
        message: 'Title is required'
      });
    }

    // Handle file upload
    let image_url = req.body.image_url; // Allow URL from request
    let image_path = null;

    if (req.file) {
      // File was uploaded
      image_path = `/uploads/${req.file.filename}`;
      image_url = `${req.protocol}://${req.get('host')}${image_path}`;
    } else if (!image_url) {
      return res.status(400).json({
        success: false,
        message: 'Either image file or image_url is required'
      });
    }

    const imageData = {
      title,
      description: description || null,
      image_url,
      image_path,
      category: category || 'other',
      display_order: display_order ? parseInt(display_order) : 0,
      is_active: is_active !== 'false'
    };

    const id = await createImage(imageData);

    res.status(201).json({
      success: true,
      message: 'Image created successfully',
      data: { id, ...imageData }
    });
  } catch (error) {
    console.error('Error creating image:', error);

    // Clean up uploaded file if database insert failed
    if (req.file) {
      const filePath = path.join(uploadsDir, req.file.filename);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    res.status(500).json({
      success: false,
      message: 'Failed to create image',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

/**
 * POST /api/gallery/bulk
 * Create multiple images at once
 */
router.post('/bulk', upload.array('images', 50), async (req, res) => {
  try {
    const { images } = req.body;

    if (!images || !Array.isArray(images)) {
      return res.status(400).json({
        success: false,
        message: 'images array is required'
      });
    }

    const results = await bulkCreateImages(images);

    res.status(201).json({
      success: true,
      message: `Processed ${results.length} images`,
      results
    });
  } catch (error) {
    console.error('Error bulk creating images:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create images',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

/**
 * PUT /api/gallery/:id
 * Update an image
 */
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const { id } = req.params;
    const existingImage = await getImageById(id);

    if (!existingImage) {
      // Clean up uploaded file if image doesn't exist
      if (req.file) {
        const filePath = path.join(uploadsDir, req.file.filename);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }
      return res.status(404).json({
        success: false,
        message: 'Image not found'
      });
    }

    const updateData = { ...req.body };

    // Handle file upload
    if (req.file) {
      // Delete old file if it exists
      if (existingImage.image_path) {
        const oldFilePath = path.join(__dirname, '..', existingImage.image_path);
        if (fs.existsSync(oldFilePath)) {
          fs.unlinkSync(oldFilePath);
        }
      }

      updateData.image_path = `/uploads/${req.file.filename}`;
      updateData.image_url = `${req.protocol}://${req.get('host')}${updateData.image_path}`;
    }

    // Convert string booleans and numbers
    if (updateData.display_order !== undefined) {
      updateData.display_order = parseInt(updateData.display_order);
    }
    if (updateData.is_active !== undefined) {
      updateData.is_active = updateData.is_active === 'true' || updateData.is_active === true;
    }

    const updated = await updateImage(id, updateData);

    if (!updated) {
      return res.status(400).json({
        success: false,
        message: 'No changes to update'
      });
    }

    const updatedImage = await getImageById(id);

    res.json({
      success: true,
      message: 'Image updated successfully',
      data: updatedImage
    });
  } catch (error) {
    console.error('Error updating image:', error);

    // Clean up uploaded file if update failed
    if (req.file) {
      const filePath = path.join(uploadsDir, req.file.filename);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    res.status(500).json({
      success: false,
      message: 'Failed to update image',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

/**
 * DELETE /api/gallery/:id
 * Delete an image
 */
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const image = await getImageById(id);

    if (!image) {
      return res.status(404).json({
        success: false,
        message: 'Image not found'
      });
    }

    // Delete file from filesystem
    if (image.image_path) {
      const filePath = path.join(__dirname, '..', image.image_path);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    const deleted = await deleteImage(id);

    if (!deleted) {
      return res.status(500).json({
        success: false,
        message: 'Failed to delete image'
      });
    }

    res.json({
      success: true,
      message: 'Image deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting image:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete image',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

module.exports = router;




