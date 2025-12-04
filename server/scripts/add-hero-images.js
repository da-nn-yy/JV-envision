/**
 * Script to add hero images to the database
 *
 * This script adds the new hero images based on the descriptions provided.
 * You'll need to either:
 * 1. Provide image URLs in the images array below
 * 2. Or upload the images first and then update the URLs
 *
 * Usage: node scripts/add-hero-images.js
 */

const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const { initPool, closePool } = require('../db');
const { bulkCreateImages } = require('../models/Gallery');

async function addHeroImages() {
  try {
    // Initialize database connection
    const pool = await initPool();
    if (!pool) {
      console.error('❌ Database connection failed. Please check your MySQL configuration.');
      process.exit(1);
    }

    console.log('✅ Database connected\n');

    // Hero images to add - UPDATE THESE WITH YOUR ACTUAL IMAGE URLs OR PATHS
    const heroImages = [
      {
        title: 'Joyful Couple on City Bench',
        description: 'A beautiful couple in wedding attire, sitting closely on a wooden bench in an urban setting, capturing the joy and romance of their special day',
        image_url: '', // TODO: Add your image URL or path here
        category: 'hero',
        display_order: 1,
        is_active: true
      },
      {
        title: 'Elegant Outdoor Gathering',
        description: 'A sophisticated black and white photograph of an outdoor celebration with a beautifully decorated table, white roses, and candles in a lush garden setting',
        image_url: '', // TODO: Add your image URL or path here
        category: 'hero',
        display_order: 2,
        is_active: true
      },
      {
        title: 'Traditional Ceremony',
        description: 'A vibrant religious ceremony featuring elaborate traditional vestments, rich colors, and cultural significance',
        image_url: '', // TODO: Add your image URL or path here
        category: 'hero',
        display_order: 3,
        is_active: true
      },
      {
        title: 'Elegant Wedding Table Setting',
        description: 'A beautifully arranged outdoor wedding table with white roses, candles, and classic place settings, featuring a stunning floral archway',
        image_url: '', // TODO: Add your image URL or path here
        category: 'hero',
        display_order: 4,
        is_active: true
      },
      {
        title: 'Traditional Celebration',
        description: 'A group of women in traditional white dresses celebrating together, featuring a central figure in vibrant traditional attire',
        image_url: '', // TODO: Add your image URL or path here
        category: 'hero',
        display_order: 5,
        is_active: true
      },
      {
        title: 'Cultural Wedding Procession',
        description: 'A joyful couple in traditional attire surrounded by celebrating guests with palm fronds and traditional decorations',
        image_url: '', // TODO: Add your image URL or path here
        category: 'hero',
        display_order: 6,
        is_active: true
      },
      {
        title: 'Henna Adorned Hands',
        description: 'Close-up of beautifully decorated hands with intricate henna designs, gold jewelry, and traditional patterns',
        image_url: '', // TODO: Add your image URL or path here
        category: 'hero',
        display_order: 7,
        is_active: true
      },
      {
        title: 'Celebration Moment',
        description: 'Three women at an indoor event, capturing a moment of surprise and joy in a modern event space',
        image_url: '', // TODO: Add your image URL or path here
        category: 'hero',
        display_order: 8,
        is_active: true
      }
    ];

    // Filter out images without URLs
    const imagesToAdd = heroImages.filter(img => img.image_url && img.image_url.trim() !== '');

    if (imagesToAdd.length === 0) {
      console.log('⚠️  No images to add. Please update the image_url fields in this script with your actual image URLs or paths.\n');
      console.log('💡 You can:');
      console.log('   1. Upload images via the API: POST /api/gallery with image file');
      console.log('   2. Add image URLs directly in this script');
      console.log('   3. Use the API to add images with URLs\n');
      process.exit(0);
    }

    console.log(`📸 Adding ${imagesToAdd.length} hero images to database...\n`);

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

    if (successCount > 0) {
      console.log('\n✨ Hero images have been added! The hero carousel will now display these images.');
    }

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
  addHeroImages();
}

module.exports = { addHeroImages };




