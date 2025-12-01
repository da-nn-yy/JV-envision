const mysql = require('mysql2/promise');

let pool;

const buildConfig = () => {
  const password = process.env.MYSQL_PASSWORD !== undefined
    ? process.env.MYSQL_PASSWORD
    : '';

  const config = {
    host: process.env.MYSQL_HOST || 'localhost',
    port: Number(process.env.MYSQL_PORT || 3306),
    user: process.env.MYSQL_USER || 'root',
    password,
    database: process.env.MYSQL_DATABASE || 'jv-envision-photography',
    waitForConnections: true,
    connectionLimit: Number(process.env.MYSQL_CONNECTION_LIMIT || 10),
    queueLimit: 0
  };

  if (process.env.MYSQL_SSL === 'true') {
    config.ssl = { rejectUnauthorized: false };
  }

  return config;
};

const ensureSchema = async (dbPool) => {
  await dbPool.execute(`
    CREATE TABLE IF NOT EXISTS contacts (
      id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(255) NOT NULL,
      phone VARCHAR(20) DEFAULT '',
      message TEXT NOT NULL,
      service_type ENUM('wedding', 'portrait', 'event', 'other') DEFAULT 'other',
      preferred_date DATE NULL,
      status ENUM('new', 'contacted', 'quoted', 'booked', 'completed') DEFAULT 'new',
      notes VARCHAR(500) DEFAULT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      INDEX idx_contacts_email_created_at (email, created_at DESC),
      INDEX idx_contacts_status (status)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);

  await dbPool.execute(`
    CREATE TABLE IF NOT EXISTS gallery_images (
      id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      image_url VARCHAR(500) NOT NULL,
      image_path VARCHAR(500),
      category ENUM('weddings', 'portraits', 'events', 'nature', 'hero', 'instagram', 'other') DEFAULT 'other',
      display_order INT DEFAULT 0,
      is_active BOOLEAN DEFAULT TRUE,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      INDEX idx_gallery_category (category),
      INDEX idx_gallery_active (is_active),
      INDEX idx_gallery_order (display_order)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);
};

const initPool = async () => {
  if (pool) return pool;

  try {
    const config = buildConfig();
    pool = mysql.createPool(config);
    await pool.query('SELECT 1');

    try {
      const dbName = config.database.includes('-') ? `\`${config.database}\`` : config.database;
      await pool.query(`CREATE DATABASE IF NOT EXISTS ${dbName} CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
      await pool.query(`USE ${dbName}`);
    } catch (dbError) {}

    await ensureSchema(pool);
    return pool;

  } catch (error) {
    pool = undefined;

    if (process.env.NODE_ENV === 'development') {
      return null;
    }

    throw error;
  }
};

const getPool = () => {
  if (!pool) {
    if (process.env.NODE_ENV === 'development') {
      throw new Error('MySQL pool not initialized. Running in development mode without database.');
    }
    throw new Error('MySQL pool not initialized. Call initPool() first.');
  }
  return pool;
};

const closePool = async () => {
  if (pool) {
    await pool.end();
    pool = undefined;
  }
};

module.exports = {
  initPool,
  getPool,
  closePool
};
