/**
 * Script to add images to the database
 * Usage: node scripts/add-images.js
 *
 * This script allows you to add images to the database either by:
 * 1. Providing image URLs
 * 2. Uploading image files
 */

const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const { initPool, closePool } = require('../db');
const { createImage, bulkCreateImages } = require('../models/Gallery');

async function addImages() {
  try {
    // Initialize database connection
    const pool = await initPool();
    if (!pool) {
      console.error('❌ Database connection failed. Please check your MySQL configuration.');
      process.exit(1);
    }

    console.log('✅ Database connected\n');

    // Example: Add images with URLs
    const imagesToAdd = [
      {
        title: 'Wedding Ceremony',
        description: 'Beautiful outdoor wedding ceremony',
        image_url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=600&fit=crop',
        category: 'weddings',
        display_order: 1,
        is_active: true
      },
      {
        title: 'Family Portrait',
        description: 'Natural family portraits in golden hour',
        image_url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&h=600&fit=crop',
        category: 'portraits',
        display_order: 2,
        is_active: true
      },
      {
        title: 'Corporate Event',
        description: 'Corporate networking event photography',
        image_url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=600&fit=crop',
        category: 'events',
        display_order: 3,
        is_active: true
      }
    ];

    console.log('📸 Adding images to database...\n');

    const results = await bulkCreateImages(imagesToAdd);

    let successCount = 0;
    let failCount = 0;

    results.forEach((result, index) => {
      if (result.success) {
        console.log(`✅ Image ${index + 1}: "${result.image.title}" added (ID: ${result.id})`);
        successCount++;
      } else {
        console.error(`❌ Image ${index + 1}: "${result.image.title}" failed - ${result.error}`);
        failCount++;
      }
    });

    console.log(`\n📊 Summary: ${successCount} succeeded, ${failCount} failed`);

    await closePool();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    await closePool();
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  addImages();
}

module.exports = { addImages };




