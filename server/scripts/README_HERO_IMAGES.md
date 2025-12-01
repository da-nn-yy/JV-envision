# Adding Hero Images to the Database

This guide explains how to add your new hero images to replace the existing carousel images.

## Quick Start

### Option 1: Upload Images via API (Recommended)

1. **Make sure your server is running:**
   ```bash
   cd server
   npm run dev
   ```

2. **Upload images using curl:**
   ```bash
   # Upload a single image
   curl -X POST http://localhost:5000/api/gallery \
     -F "image=@/path/to/your/image.jpg" \
     -F "title=Joyful Couple on City Bench" \
     -F "description=A beautiful couple in wedding attire" \
     -F "category=hero" \
     -F "display_order=1" \
     -F "is_active=true"
   ```

3. **Or use the upload script:**
   ```bash
   cd server
   node scripts/upload-hero-images.js \
     ../client/src/assets/hero1.jpg \
     ../client/src/assets/hero2.jpg \
     ../client/src/assets/hero3.jpg
   ```

### Option 2: Add Images with URLs

If your images are already hosted online:

```bash
curl -X POST http://localhost:5000/api/gallery \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Joyful Couple on City Bench",
    "description": "A beautiful couple in wedding attire",
    "image_url": "https://example.com/your-image.jpg",
    "category": "hero",
    "display_order": 1,
    "is_active": true
  }'
```

### Option 3: Use the Add Images Script

Edit `server/scripts/add-hero-images.js` and add your image URLs, then run:

```bash
cd server
node scripts/add-hero-images.js
```

## Image Metadata

Here are the suggested titles and descriptions for your 8 hero images:

1. **Joyful Couple on City Bench**
   - Description: "A beautiful couple in wedding attire, sitting closely on a wooden bench in an urban setting"

2. **Elegant Outdoor Gathering**
   - Description: "A sophisticated black and white photograph of an outdoor celebration with a beautifully decorated table"

3. **Traditional Ceremony**
   - Description: "A vibrant religious ceremony featuring elaborate traditional vestments and rich colors"

4. **Elegant Wedding Table Setting**
   - Description: "A beautifully arranged outdoor wedding table with white roses, candles, and classic place settings"

5. **Traditional Celebration**
   - Description: "A group of women in traditional white dresses celebrating together"

6. **Cultural Wedding Procession**
   - Description: "A joyful couple in traditional attire surrounded by celebrating guests"

7. **Henna Adorned Hands**
   - Description: "Close-up of beautifully decorated hands with intricate henna designs and gold jewelry"

8. **Celebration Moment**
   - Description: "Three women at an indoor event, capturing a moment of surprise and joy"

## Verifying Images

After uploading, verify the images are in the database:

```bash
curl http://localhost:5000/api/gallery?category=hero
```

## Frontend Integration

The frontend is already configured to fetch hero images from the API. Once you add images with `category=hero`, they will automatically appear in the hero carousel.

The system will:
- Fetch images from `/api/gallery?category=hero`
- Display them in the hero carousel
- Fall back to local images if the API is unavailable

## Troubleshooting

1. **Images not showing?**
   - Check that images have `category=hero` and `is_active=true`
   - Verify the API is running and accessible
   - Check browser console for errors

2. **Upload fails?**
   - Ensure file size is under 10MB
   - Check file format (JPEG, PNG, GIF, WebP)
   - Verify server is running

3. **Database connection issues?**
   - Check your `.env` file in the server directory
   - Ensure MySQL is running
   - Verify database credentials

## Next Steps

After adding your hero images:
1. The carousel will automatically update
2. You can manage images via the API endpoints
3. Images are stored in `server/uploads/` directory


