# JV Envision Photography Website

A modern, responsive photography website built with React.js, Node.js, and MongoDB. This project showcases JV Envision Photography's portfolio, services, and provides a platform for client inquiries and bookings.

## 🌟 Features

- **Modern Design**: Clean, elegant interface with smooth animations
- **Responsive Layout**: Optimized for mobile, tablet, and desktop
- **Portfolio Gallery**: Interactive gallery with category filters and lightbox view
- **Service Packages**: Detailed pricing and package information
- **Contact System**: Functional contact form with backend integration
- **Instagram Integration**: Social media feed preview
- **Testimonials**: Client reviews and feedback
- **SEO Optimized**: Fast loading and search engine friendly

## 🛠️ Tech Stack

### Frontend
- **React.js** - Modern JavaScript library
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **React Router** - Client-side routing
- **Lucide React** - Beautiful icons

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **CORS** - Cross-origin resource sharing

## 📁 Project Structure

```
JV-project/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable React components
│   │   ├── pages/         # Page components
│   │   ├── data/          # Sample data files
│   │   ├── assets/         # Static assets
│   │   ├── App.jsx        # Main App component
│   │   ├── main.jsx        # Application entry point
│   │   └── index.css       # Global styles
│   ├── public/            # Public assets
│   ├── package.json       # Frontend dependencies
│   └── vite.config.js     # Vite configuration
├── server/                 # Backend Node.js application
│   ├── routes/            # API routes
│   ├── models/            # Database models
│   ├── index.js           # Server entry point
│   └── package.json       # Backend dependencies
└── README.md              # Project documentation
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB Atlas account (for cloud database) or local MongoDB installation

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd JV-project
   ```

2. **Install frontend dependencies**
   ```bash
   cd client
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd ../server
   npm install
   ```

4. **Set up environment variables**
   ```bash
   # In the server directory, create a .env file
   cp env.example .env
   ```
   
   Update the `.env` file with your MongoDB connection string:
   ```
   MONGODB_URI=your_mongodb_connection_string
   PORT=5000
   NODE_ENV=development
   CLIENT_URL=http://localhost:5173
   ```

### Running the Application

1. **Start the backend server**
   ```bash
   cd server
   npm run dev
   ```
   The server will start on `http://localhost:5000`

2. **Start the frontend development server**
   ```bash
   cd client
   npm run dev
   ```
   The frontend will start on `http://localhost:5173`

3. **Open your browser**
   Navigate to `http://localhost:5173` to view the website

## 📱 Pages & Features

### Home Page
- Hero section with call-to-action buttons
- Instagram feed preview
- Client testimonials
- Service highlights

### Portfolio Page
- Interactive gallery with category filters
- Lightbox image viewer
- Photography process overview
- Statistics and achievements

### About Page
- Photographer's story and philosophy
- Professional achievements
- Core values and approach
- Social media links

### Services Page
- Detailed service packages
- Pricing information
- Add-on services
- FAQ section
- Booking process overview

### Contact Page
- Contact form with validation
- Contact information
- Service areas
- Social media integration

## 🔧 Configuration

### Frontend Configuration

The frontend uses Tailwind CSS with custom configuration in `tailwind.config.js`:

```javascript
theme: {
  extend: {
    fontFamily: {
      'sans': ['Poppins', 'sans-serif'],
      'serif': ['Playfair Display', 'serif'],
    },
    colors: {
      'gold': '#D4AF37',
      'beige': '#F5F5DC',
      'soft-gold': '#F4E4BC',
    }
  }
}
```

### Backend Configuration

The backend server configuration is in `server/index.js`:

- CORS enabled for frontend communication
- MongoDB connection with error handling
- Express middleware for JSON parsing
- Global error handling
- Health check endpoint

## 📊 API Endpoints

### Contact API (`/api/contact`)

- **POST** `/api/contact` - Submit contact inquiry
- **GET** `/api/contact` - Get all inquiries (admin)
- **GET** `/api/contact/:id` - Get single inquiry
- **PUT** `/api/contact/:id` - Update inquiry status

### Health Check
- **GET** `/api/health` - Server health status

## 🎨 Customization

### Colors and Branding
Update the color scheme in `client/tailwind.config.js`:

```javascript
colors: {
  'gold': '#D4AF37',        // Primary brand color
  'beige': '#F5F5DC',       // Secondary color
  'soft-gold': '#F4E4BC',   // Accent color
}
```

### Content Updates
- **Portfolio**: Update `client/src/data/portfolio.js`
- **Services**: Update `client/src/data/services.js`
- **Testimonials**: Update `client/src/data/testimonials.js`
- **Instagram**: Update `client/src/data/instagram.js`

### Images
Replace placeholder images with actual photography:
- Update image URLs in data files
- Optimize images for web (WebP format recommended)
- Ensure responsive image sizes

## 🚀 Deployment

### Frontend Deployment (Vercel/Netlify)

1. **Build the frontend**
   ```bash
   cd client
   npm run build
   ```

2. **Deploy to Vercel**
   ```bash
   npm install -g vercel
   vercel --prod
   ```

3. **Deploy to Netlify**
   - Connect your GitHub repository
   - Set build command: `npm run build`
   - Set publish directory: `dist`

### Backend Deployment (Render/Heroku)

1. **Prepare for production**
   ```bash
   cd server
   npm install --production
   ```

2. **Deploy to Render**
   - Connect GitHub repository
   - Set build command: `npm install`
   - Set start command: `npm start`
   - Add environment variables

3. **Deploy to Heroku**
   ```bash
   heroku create jv-envision-api
   heroku config:set MONGODB_URI=your_production_mongodb_uri
   git push heroku main
   ```

### Environment Variables for Production

```bash
MONGODB_URI=your_production_mongodb_uri
PORT=5000
NODE_ENV=production
CLIENT_URL=https://your-frontend-domain.com
```

## 🔒 Security Considerations

- Input validation on all forms
- CORS configuration for specific domains
- Environment variables for sensitive data
- Rate limiting (recommended for production)
- HTTPS enforcement in production

## 📈 Performance Optimization

- Image optimization and lazy loading
- Code splitting with React Router
- Tailwind CSS purging for smaller bundle size
- MongoDB indexing for faster queries
- Compression middleware for API responses

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Check connection string format
   - Verify network access in MongoDB Atlas
   - Ensure IP whitelist includes your server

2. **CORS Errors**
   - Update CLIENT_URL in environment variables
   - Check frontend URL matches backend configuration

3. **Build Errors**
   - Clear node_modules and reinstall
   - Check Node.js version compatibility
   - Verify all dependencies are installed

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support and questions:
- Email: hello@jvenvision.com
- Phone: (555) 123-4567
- Website: [jvenvision.com](https://jvenvision.com)

## 🙏 Acknowledgments

- Unsplash for placeholder images
- Lucide for beautiful icons
- Tailwind CSS for styling framework
- React and Vite communities for excellent documentation

---

**Built with ❤️ for JV Envision Photography**


