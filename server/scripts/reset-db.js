const mysql = require('mysql2/promise');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const resetDb = async () => {
  const config = {
    host: process.env.MYSQL_HOST || 'localhost',
    port: Number(process.env.MYSQL_PORT || 3306),
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || '',
    multipleStatements: true
  };

  const dbName = process.env.MYSQL_DATABASE || 'jv-envision-photography';

  console.log('Connecting to MySQL...');
  let connection;
  try {
    connection = await mysql.createConnection(config);

    console.log(`Dropping database ${dbName} if exists...`);
    await connection.query(`DROP DATABASE IF EXISTS \`${dbName}\``);

    console.log(`Creating database ${dbName}...`);
    await connection.query(`CREATE DATABASE \`${dbName}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);

    console.log(`Using database ${dbName}...`);
    await connection.query(`USE \`${dbName}\``);

    console.log('Creating tables...');
    // We can read schema.sql or just use the same SQL we put in db/index.js
    // Let's use the SQL directly to be sure.

    const contactsTable = `
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
    `;

    const siteImagesTable = `
      CREATE TABLE IF NOT EXISTS site_images (
        id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        url VARCHAR(255) NOT NULL,
        title VARCHAR(100) DEFAULT NULL,
        subtitle VARCHAR(255) DEFAULT NULL,
        description TEXT DEFAULT NULL,
        section ENUM('hero', 'gallery', 'about', 'services', 'portfolio') DEFAULT 'gallery',
        category VARCHAR(50) DEFAULT NULL,
        active BOOLEAN DEFAULT TRUE,
        display_order INT DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_section (section),
        INDEX idx_category (category)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `;

    await connection.query(contactsTable);
    await connection.query(siteImagesTable);

    console.log('Database reset successfully!');

  } catch (error) {
    console.error('Error resetting database:', error);
  } finally {
    if (connection) await connection.end();
  }
};

resetDb();
