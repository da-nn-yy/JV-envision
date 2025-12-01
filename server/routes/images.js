const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configure Multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, '../uploads');
    if (!fs.existsSync(uploadDir)){
        fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|webp/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Only images are allowed!'));
  }
});

// GET all active images, optionally filtered by section and category
router.get('/', async (req, res) => {
  try {
    const db = req.app.get('db');
    if (!db) {
      console.error('Database not initialized');
      return res.status(503).json({ message: 'Database not available' });
    }
    const { section, category } = req.query;

    let query = 'SELECT * FROM site_images WHERE active = TRUE';
    const params = [];

    if (section) {
      query += ' AND section = ?';
      params.push(section);
    }

    if (category) {
      query += ' AND category = ?';
      params.push(category);
    }

    query += ' ORDER BY display_order ASC, created_at DESC';

    const [rows] = await db.query(query, params);

    const images = rows.map(img => ({
      ...img,
      image: `${req.protocol}://${req.get('host')}/uploads/${img.url}`
    }));

    res.json(images);
  } catch (error) {
    console.error('Error fetching images:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST upload new image
router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No image uploaded' });
    }

    const { title, subtitle, description, section, category } = req.body;
    const filename = req.file.filename;
    const db = req.app.get('db');

    if (!db) {
      return res.status(503).json({ message: 'Database not available' });
    }

    const [result] = await db.query(
      'INSERT INTO site_images (url, title, subtitle, description, section, category) VALUES (?, ?, ?, ?, ?, ?)',
      [filename, title || '', subtitle || '', description || '', section || 'gallery', category || null]
    );

    res.status(201).json({
      message: 'Image uploaded successfully',
      id: result.insertId,
      url: filename
    });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE image
router.delete('/:id', async (req, res) => {
  try {
    const db = req.app.get('db');
    if (!db) {
      return res.status(503).json({ message: 'Database not available' });
    }
    const { id } = req.params;

    // Get filename to delete from disk
    const [rows] = await db.query('SELECT url FROM site_images WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Image not found' });
    }

    const filename = rows[0].url;
    const filepath = path.join(__dirname, '../uploads', filename);

    // Delete from DB
    await db.query('DELETE FROM site_images WHERE id = ?', [id]);

    // Delete from disk
    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
    }

    res.json({ message: 'Image deleted successfully' });
  } catch (error) {
    console.error('Error deleting image:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
