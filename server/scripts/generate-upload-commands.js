/**
 * Script to generate curl commands for uploading hero images
 *
 * This script generates ready-to-use curl commands that you can copy and paste
 * to upload your hero images.
 *
 * Usage: node scripts/generate-upload-commands.js
 */

const heroImageMetadata = [
  {
    title: 'Joyful Couple on City Bench',
    description: 'A beautiful couple in wedding attire, sitting closely on a wooden bench in an urban setting, capturing the joy and romance of their special day',
    display_order: 1
  },
  {
    title: 'Elegant Outdoor Gathering',
    description: 'A sophisticated black and white photograph of an outdoor celebration with a beautifully decorated table, white roses, and candles in a lush garden setting',
    display_order: 2
  },
  {
    title: 'Traditional Ceremony',
    description: 'A vibrant religious ceremony featuring elaborate traditional vestments, rich colors, and cultural significance',
    display_order: 3
  },
  {
    title: 'Elegant Wedding Table Setting',
    description: 'A beautifully arranged outdoor wedding table with white roses, candles, and classic place settings, featuring a stunning floral archway',
    display_order: 4
  },
  {
    title: 'Traditional Celebration',
    description: 'A group of women in traditional white dresses celebrating together, featuring a central figure in vibrant traditional attire',
    display_order: 5
  },
  {
    title: 'Cultural Wedding Procession',
    description: 'A joyful couple in traditional attire surrounded by celebrating guests with palm fronds and traditional decorations',
    display_order: 6
  },
  {
    title: 'Henna Adorned Hands',
    description: 'Close-up of beautifully decorated hands with intricate henna designs, gold jewelry, and traditional patterns',
    display_order: 7
  },
  {
    title: 'Celebration Moment',
    description: 'Three women at an indoor event, capturing a moment of surprise and joy in a modern event space',
    display_order: 8
  }
];

function generateCurlCommand(imagePath, metadata, index) {
  const escapedTitle = metadata.title.replace(/'/g, "'\\''");
  const escapedDescription = metadata.description.replace(/'/g, "'\\''");

  return `curl -X POST http://localhost:5000/api/gallery \\
  -F "image=@${imagePath}" \\
  -F "title=${escapedTitle}" \\
  -F "description=${escapedDescription}" \\
  -F "category=hero" \\
  -F "display_order=${metadata.display_order}" \\
  -F "is_active=true"`;
}

function main() {
  console.log('📋 Hero Image Upload Commands\n');
  console.log('Copy and paste these commands to upload your hero images:\n');
  console.log('⚠️  Replace <IMAGE_PATH> with the actual path to your image files\n');
  console.log('─'.repeat(80));

  heroImageMetadata.forEach((metadata, index) => {
    console.log(`\n# Image ${index + 1}: ${metadata.title}`);
    console.log(generateCurlCommand('<IMAGE_PATH>', metadata, index));
  });

  console.log('\n' + '─'.repeat(80));
  console.log('\n💡 Tips:');
  console.log('   - Make sure your server is running (npm run dev in server directory)');
  console.log('   - Replace <IMAGE_PATH> with actual file paths');
  console.log('   - Images should be JPEG, PNG, GIF, or WebP format');
  console.log('   - Maximum file size: 10MB');
  console.log('\n📝 Example:');
  console.log('   curl -X POST http://localhost:5000/api/gallery \\');
  console.log('     -F "image=@./my-image.jpg" \\');
  console.log('     -F "title=My Hero Image" \\');
  console.log('     -F "description=Description here" \\');
  console.log('     -F "category=hero" \\');
  console.log('     -F "display_order=1" \\');
  console.log('     -F "is_active=true"');
  console.log('');
}

if (require.main === module) {
  main();
}

module.exports = { generateCurlCommand, heroImageMetadata };





