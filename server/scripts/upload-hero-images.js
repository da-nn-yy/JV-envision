/**
 * Script to upload hero images to the database
 *
 * This script uploads image files and adds them to the database as hero images.
 *
 * Usage:
 *   node scripts/upload-hero-images.js <image1.jpg> <image2.jpg> ...
 *
 * Or update the imagePaths array below with your image file paths.
 */

const path = require('path');
const fs = require('fs');
const http = require('http');

require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const API_URL = process.env.API_URL || 'http://localhost:5000';
const PORT = process.env.PORT || 5000;

// Hero image metadata - update these with your image details
const heroImageMetadata = [
  {
    title: 'Joyful Couple on City Bench',
    description: 'A beautiful couple in wedding attire, sitting closely on a wooden bench in an urban setting',
    category: 'hero',
    display_order: 1
  },
  {
    title: 'Elegant Outdoor Gathering',
    description: 'A sophisticated black and white photograph of an outdoor celebration with a beautifully decorated table',
    category: 'hero',
    display_order: 2
  },
  {
    title: 'Traditional Ceremony',
    description: 'A vibrant religious ceremony featuring elaborate traditional vestments and rich colors',
    category: 'hero',
    display_order: 3
  },
  {
    title: 'Elegant Wedding Table Setting',
    description: 'A beautifully arranged outdoor wedding table with white roses, candles, and classic place settings',
    category: 'hero',
    display_order: 4
  },
  {
    title: 'Traditional Celebration',
    description: 'A group of women in traditional white dresses celebrating together',
    category: 'hero',
    display_order: 5
  },
  {
    title: 'Cultural Wedding Procession',
    description: 'A joyful couple in traditional attire surrounded by celebrating guests',
    category: 'hero',
    display_order: 6
  },
  {
    title: 'Henna Adorned Hands',
    description: 'Close-up of beautifully decorated hands with intricate henna designs and gold jewelry',
    category: 'hero',
    display_order: 7
  },
  {
    title: 'Celebration Moment',
    description: 'Three women at an indoor event, capturing a moment of surprise and joy',
    category: 'hero',
    display_order: 8
  }
];

async function uploadImage(imagePath, metadata, index) {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(imagePath)) {
      return reject(new Error(`Image file not found: ${imagePath}`));
    }

    const form = new FormData();
    form.append('image', fs.createReadStream(imagePath));
    form.append('title', metadata.title);
    form.append('description', metadata.description);
    form.append('category', metadata.category);
    form.append('display_order', metadata.display_order.toString());
    form.append('is_active', 'true');

    const options = {
      hostname: 'localhost',
      port: PORT,
      path: '/api/gallery',
      method: 'POST',
      headers: form.getHeaders()
    };

    const req = http.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          const response = JSON.parse(data);
          if (res.statusCode === 201 && response.success) {
            resolve(response);
          } else {
            reject(new Error(response.message || 'Upload failed'));
          }
        } catch (err) {
          reject(new Error(`Failed to parse response: ${data}`));
        }
      });
    });

    req.on('error', (err) => {
      reject(err);
    });

    form.pipe(req);
  });
}

async function uploadHeroImages() {
  try {
    // Get image paths from command line arguments or use default
    const imagePaths = process.argv.slice(2);

    if (imagePaths.length === 0) {
      console.log('📋 Usage: node scripts/upload-hero-images.js <image1.jpg> <image2.jpg> ...\n');
      console.log('💡 Example:');
      console.log('   node scripts/upload-hero-images.js');
      console.log('     ../client/src/assets/hero1.jpg');
      console.log('     ../client/src/assets/hero2.jpg');
      console.log('     ../client/src/assets/hero3.jpg\n');
      console.log('⚠️  Please provide image file paths as arguments.\n');
      process.exit(1);
    }

    if (imagePaths.length > heroImageMetadata.length) {
      console.log(`⚠️  Warning: You provided ${imagePaths.length} images, but only ${heroImageMetadata.length} metadata entries exist.`);
      console.log('   Extra images will use default metadata.\n');
    }

    console.log(`📸 Uploading ${imagePaths.length} hero images...\n`);

    const results = [];

    for (let i = 0; i < imagePaths.length; i++) {
      const imagePath = path.resolve(imagePaths[i]);
      const metadata = heroImageMetadata[i] || {
        title: `Hero Image ${i + 1}`,
        description: 'Hero carousel image',
        category: 'hero',
        display_order: i + 1
      };

      try {
        console.log(`📤 Uploading ${i + 1}/${imagePaths.length}: ${path.basename(imagePath)}...`);
        const result = await uploadImage(imagePath, metadata, i);
        console.log(`   ✅ Success: "${metadata.title}" (ID: ${result.data.id})`);
        results.push({ success: true, result, imagePath });
      } catch (error) {
        console.error(`   ❌ Failed: ${error.message}`);
        results.push({ success: false, error: error.message, imagePath });
      }
    }

    console.log('\n📊 Upload Summary:');
    const successCount = results.filter(r => r.success).length;
    const failCount = results.filter(r => !r.success).length;
    console.log(`   ✅ Succeeded: ${successCount}`);
    console.log(`   ❌ Failed: ${failCount}`);

    if (successCount > 0) {
      console.log('\n✨ Hero images uploaded successfully! The hero carousel will now display these images.');
    }

    process.exit(failCount > 0 ? 1 : 0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  uploadHeroImages();
}

module.exports = { uploadHeroImages };
