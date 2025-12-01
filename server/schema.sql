CREATE DATABASE IF NOT EXISTS `jv-envision-photography` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `jv-envision-photography`;

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
