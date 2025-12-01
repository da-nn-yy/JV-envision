const { getPool } = require('../db');

/**
 * Create a new gallery image
 */
async function createImage(imageData) {
  const pool = getPool();
  if (!pool) {
    throw new Error('Database not available');
  }
  const {
    title,
    description,
    image_url,
    image_path,
    category = 'other',
    display_order = 0,
    is_active = true
  } = imageData;

  const [result] = await pool.execute(
    `INSERT INTO gallery_images
     (title, description, image_url, image_path, category, display_order, is_active)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [title, description || null, image_url, image_path || null, category, display_order, is_active]
  );

  return result.insertId;
}

/**
 * Get all images, optionally filtered by category
 */
async function getAllImages(category = null, activeOnly = true) {
  const pool = getPool();
  if (!pool) {
    throw new Error('Database not available');
  }
  let query = 'SELECT * FROM gallery_images';
  const params = [];

  if (category) {
    query += ' WHERE category = ?';
    params.push(category);
    if (activeOnly) {
      query += ' AND is_active = TRUE';
    }
  } else if (activeOnly) {
    query += ' WHERE is_active = TRUE';
  }

  query += ' ORDER BY display_order ASC, created_at DESC';

  const [rows] = await pool.execute(query, params);
  return rows;
}

/**
 * Get image by ID
 */
async function getImageById(id) {
  const pool = getPool();
  if (!pool) {
    throw new Error('Database not available');
  }
  const [rows] = await pool.execute(
    'SELECT * FROM gallery_images WHERE id = ?',
    [id]
  );
  return rows[0] || null;
}

/**
 * Update an image
 */
async function updateImage(id, imageData) {
  const pool = getPool();
  if (!pool) {
    throw new Error('Database not available');
  }
  const {
    title,
    description,
    image_url,
    image_path,
    category,
    display_order,
    is_active
  } = imageData;

  const updates = [];
  const params = [];

  if (title !== undefined) {
    updates.push('title = ?');
    params.push(title);
  }
  if (description !== undefined) {
    updates.push('description = ?');
    params.push(description);
  }
  if (image_url !== undefined) {
    updates.push('image_url = ?');
    params.push(image_url);
  }
  if (image_path !== undefined) {
    updates.push('image_path = ?');
    params.push(image_path);
  }
  if (category !== undefined) {
    updates.push('category = ?');
    params.push(category);
  }
  if (display_order !== undefined) {
    updates.push('display_order = ?');
    params.push(display_order);
  }
  if (is_active !== undefined) {
    updates.push('is_active = ?');
    params.push(is_active);
  }

  if (updates.length === 0) {
    return false;
  }

  params.push(id);
  const [result] = await pool.execute(
    `UPDATE gallery_images SET ${updates.join(', ')} WHERE id = ?`,
    params
  );

  return result.affectedRows > 0;
}

/**
 * Delete an image
 */
async function deleteImage(id) {
  const pool = getPool();
  if (!pool) {
    throw new Error('Database not available');
  }
  const [result] = await pool.execute(
    'DELETE FROM gallery_images WHERE id = ?',
    [id]
  );
  return result.affectedRows > 0;
}

/**
 * Get images by category
 */
async function getImagesByCategory(category, activeOnly = true) {
  return getAllImages(category, activeOnly);
}

/**
 * Bulk create images
 */
async function bulkCreateImages(images) {
  const pool = getPool();
  const results = [];

  for (const image of images) {
    try {
      const id = await createImage(image);
      results.push({ success: true, id, image });
    } catch (error) {
      results.push({ success: false, error: error.message, image });
    }
  }

  return results;
}

module.exports = {
  createImage,
  getAllImages,
  getImageById,
  updateImage,
  deleteImage,
  getImagesByCategory,
  bulkCreateImages
};
