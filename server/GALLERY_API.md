# Gallery API Documentation

This document describes the Gallery API endpoints for managing images in the JV Envision Photography database.

## Base URL
```
http://localhost:5000/api/gallery
```

## Endpoints

### GET /api/gallery
Get all images, optionally filtered by category.

**Query Parameters:**
- `category` (optional): Filter by category (`weddings`, `portraits`, `events`, `nature`, `hero`, `instagram`, `other`)
- `active_only` (optional): Only return active images (default: `true`)

**Example:**
```bash
GET /api/gallery
GET /api/gallery?category=weddings
GET /api/gallery?category=portraits&active_only=false
```

**Response:**
```json
{
  "success": true,
  "count": 5,
  "data": [
    {
      "id": 1,
      "title": "Wedding Ceremony",
      "description": "Beautiful outdoor wedding",
      "image_url": "http://localhost:5000/uploads/image-1234567890.jpg",
      "image_path": "/uploads/image-1234567890.jpg",
      "category": "weddings",
      "display_order": 1,
      "is_active": true,
      "created_at": "2025-01-21T10:00:00.000Z",
      "updated_at": "2025-01-21T10:00:00.000Z"
    }
  ]
}
```

### GET /api/gallery/category/:category
Get images by specific category.

**Example:**
```bash
GET /api/gallery/category/weddings
```

### GET /api/gallery/:id
Get a single image by ID.

**Example:**
```bash
GET /api/gallery/1
```

### POST /api/gallery
Create a new image. Supports both file upload and URL.

**Form Data (multipart/form-data):**
- `image` (file, optional): Image file to upload
- `image_url` (string, optional): URL of the image (if not uploading file)
- `title` (string, required): Image title
- `description` (string, optional): Image description
- `category` (string, optional): Category (default: `other`)
- `display_order` (number, optional): Display order (default: 0)
- `is_active` (boolean, optional): Active status (default: true)

**Example with file upload:**
```bash
curl -X POST http://localhost:5000/api/gallery \
  -F "image=@/path/to/image.jpg" \
  -F "title=My Wedding Photo" \
  -F "description=Beautiful wedding ceremony" \
  -F "category=weddings" \
  -F "display_order=1"
```

**Example with URL:**
```bash
curl -X POST http://localhost:5000/api/gallery \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Wedding Photo",
    "description": "Beautiful wedding",
    "image_url": "https://example.com/image.jpg",
    "category": "weddings",
    "display_order": 1
  }'
```

### POST /api/gallery/bulk
Create multiple images at once.

**Body:**
```json
{
  "images": [
    {
      "title": "Image 1",
      "image_url": "https://example.com/image1.jpg",
      "category": "weddings"
    },
    {
      "title": "Image 2",
      "image_url": "https://example.com/image2.jpg",
      "category": "portraits"
    }
  ]
}
```

### PUT /api/gallery/:id
Update an existing image.

**Form Data (multipart/form-data):**
- `image` (file, optional): New image file to upload
- `title` (string, optional): Updated title
- `description` (string, optional): Updated description
- `category` (string, optional): Updated category
- `display_order` (number, optional): Updated display order
- `is_active` (boolean, optional): Updated active status

**Example:**
```bash
curl -X PUT http://localhost:5000/api/gallery/1 \
  -F "title=Updated Title" \
  -F "description=Updated description" \
  -F "category=portraits"
```

### DELETE /api/gallery/:id
Delete an image.

**Example:**
```bash
curl -X DELETE http://localhost:5000/api/gallery/1
```

## Categories

Available categories:
- `weddings` - Wedding photography
- `portraits` - Portrait photography
- `events` - Event photography
- `nature` - Nature photography
- `hero` - Hero carousel images
- `instagram` - Instagram feed images
- `other` - Other images

## File Upload

- Supported formats: JPEG, JPG, PNG, GIF, WebP
- Maximum file size: 10MB
- Uploaded files are stored in `server/uploads/` directory
- Files are accessible via `/api/gallery/uploads/filename`

## Error Responses

All error responses follow this format:
```json
{
  "success": false,
  "message": "Error message",
  "error": "Detailed error (development only)"
}
```

## Usage Examples

### Using JavaScript/Fetch

```javascript
// Get all images
const response = await fetch('http://localhost:5000/api/gallery');
const data = await response.json();

// Upload an image
const formData = new FormData();
formData.append('image', fileInput.files[0]);
formData.append('title', 'My Photo');
formData.append('category', 'weddings');

const uploadResponse = await fetch('http://localhost:5000/api/gallery', {
  method: 'POST',
  body: formData
});
const uploadData = await uploadResponse.json();
```

### Using cURL

```bash
# Get all wedding images
curl http://localhost:5000/api/gallery?category=weddings

# Upload an image
curl -X POST http://localhost:5000/api/gallery \
  -F "image=@photo.jpg" \
  -F "title=My Photo" \
  -F "category=weddings"
```


