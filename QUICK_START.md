# Quick Start Guide - JV Envision Photography Website

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone and Install Dependencies**
   ```bash
   # Install all dependencies (root, client, and server)
   npm run install:all
   ```

2. **Set Up Environment Variables**
   ```bash
   # Copy the environment template
   cd server
   cp env.example .env

   # Edit .env file with your MongoDB connection string
   # For development, you can use a local MongoDB or MongoDB Atlas
   ```

3. **Start Development Servers**
   ```bash
   # Start both frontend and backend servers
   npm run dev
   ```

   This will start:
   - Frontend: http://localhost:5173
   - Backend: http://localhost:5000

### Individual Server Commands

**Frontend Only:**
```bash
cd client
npm run dev
```

**Backend Only:**
```bash
cd server
npm run dev
```

## 🌐 Access the Website

Once both servers are running:

1. **Frontend**: Open http://localhost:5173 in your browser
2. **Backend API**: http://localhost:5000/api/health (health check)

## 📱 Test the Features

### Portfolio Gallery
- Visit http://localhost:5173/portfolio
- Filter by categories (Weddings, Portraits, Events, Nature)
- Click images to open lightbox view
- Test responsive design on different screen sizes

### Contact Form
- Visit http://localhost:5173/contact
- Fill out the contact form
- Submit and check backend logs for the submission
- Verify data is stored in MongoDB

### Navigation
- Test all navigation links
- Check mobile menu functionality
- Verify smooth page transitions

## 🔧 Development Tips

### Hot Reload
- Frontend changes automatically refresh the browser
- Backend changes restart the server automatically

### Debugging
- Check browser console for frontend errors
- Check terminal for backend errors
- Use browser dev tools for responsive testing

### Database
- For development, you can use MongoDB Atlas (free tier)
- Or install MongoDB locally
- Check server logs for database connection status

## 🚀 Production Build

### Frontend Build
```bash
cd client
npm run build
```

### Backend Production
```bash
cd server
npm start
```

## 📊 Project Structure

```
JV-project/
├── client/          # React frontend
├── server/          # Node.js backend
├── package.json     # Root scripts
└── README.md        # Full documentation
```

## 🆘 Troubleshooting

### Common Issues

1. **Port Already in Use**
   ```bash
   # Kill processes on ports 5173 or 5000
   npx kill-port 5173
   npx kill-port 5000
   ```

2. **MongoDB Connection Error**
   - Check your .env file
   - Verify MongoDB Atlas connection string
   - Ensure IP is whitelisted

3. **Build Errors**
   ```bash
   # Clear cache and reinstall
   rm -rf node_modules
   npm install
   ```

### Getting Help

- Check the full README.md for detailed documentation
- Review DEPLOYMENT.md for production setup
- Check PROJECT_SUMMARY.md for feature overview

## ✅ Success Indicators

When everything is working correctly:

- ✅ Frontend loads at http://localhost:5173
- ✅ Backend responds at http://localhost:5000/api/health
- ✅ Contact form submits successfully
- ✅ Portfolio gallery filters work
- ✅ Mobile menu functions properly
- ✅ All pages load without errors

## 🎯 Next Steps

1. **Customize Content**
   - Replace placeholder images with real photography
   - Update contact information
   - Modify color scheme if needed

2. **Deploy to Production**
   - Follow DEPLOYMENT.md guide
   - Set up MongoDB Atlas
   - Deploy to Vercel/Netlify + Render/Heroku

3. **Add Features**
   - Implement booking system
   - Add client gallery portal
   - Integrate real Instagram API

---

**Happy Coding! 🎉**

The JV Envision Photography website is ready for development and deployment.


