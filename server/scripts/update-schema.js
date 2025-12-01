import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env vars from server directory
dotenv.config({ path: path.join(__dirname, '../.env') });

const updateSchema = async () => {
  let connection;
  try {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME || 'jv-envision-photography'
    });

    console.log('Connected to database.');

    // Update section enum to include 'instagram'
    await connection.query(`
      ALTER TABLE site_images
      MODIFY COLUMN section ENUM('hero', 'gallery', 'about', 'services', 'portfolio', 'instagram') DEFAULT 'gallery'
    `);

    console.log('Schema updated successfully: Added "instagram" to section ENUM.');

  } catch (error) {
    console.error('Error updating schema:', error);
  } finally {
    if (connection) await connection.end();
  }
};

updateSchema();
