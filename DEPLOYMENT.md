# Deployment Guide - JV Envision Photography Website

This guide provides step-by-step instructions for deploying the JV Envision Photography website to production.

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account
- Vercel/Netlify account (frontend)
- Render/Heroku account (backend)

## 📱 Frontend Deployment

### Option 1: Vercel (Recommended)

1. **Connect Repository**
   ```bash
   # Install Vercel CLI
   npm install -g vercel

   # Login to Vercel
   vercel login

   # Deploy from project root
   vercel
   ```

2. **Configure Build Settings**
   - Framework Preset: Vite
   - Build Command: `cd client && npm run build`
   - Output Directory: `client/dist`
   - Install Command: `cd client && npm install`

3. **Environment Variables**
   ```
   VITE_API_URL=https://your-backend-url.com
   ```

### Option 2: Netlify

1. **Connect Repository**
   - Go to Netlify dashboard
   - Click "New site from Git"
   - Connect your GitHub repository

2. **Build Settings**
   - Build command: `cd client && npm run build`
   - Publish directory: `client/dist`
   - Base directory: `client`

3. **Environment Variables**
   ```
   VITE_API_URL=https://your-backend-url.com
   ```

## 🖥️ Backend Deployment

### Option 1: Render (Recommended)

1. **Create New Web Service**
   - Connect GitHub repository
   - Choose "Web Service"
   - Select the `server` directory

2. **Build Settings**
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Environment: Node

3. **Environment Variables**
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/jv-envision-photography?retryWrites=true&w=majority
   NODE_ENV=production
   CLIENT_URL=https://your-frontend-url.com
   PORT=5000
   ```

### Option 2: Heroku

1. **Install Heroku CLI**
   ```bash
   # Install Heroku CLI
   npm install -g heroku

   # Login to Heroku
   heroku login
   ```

2. **Create Heroku App**
   ```bash
   # Create app
   heroku create jv-envision-api

   # Set environment variables
   heroku config:set MONGODB_URI=your_mongodb_uri
   heroku config:set NODE_ENV=production
   heroku config:set CLIENT_URL=https://your-frontend-url.com
   ```

3. **Deploy**
   ```bash
   # Deploy to Heroku
   git push heroku main
   ```

## 🗄️ Database Setup

### MongoDB Atlas

1. **Create Cluster**
   - Go to MongoDB Atlas
   - Create new cluster
   - Choose appropriate tier (M0 for development)

2. **Configure Access**
   - Create database user
   - Whitelist IP addresses
   - Get connection string

3. **Create Database**
   - Database name: `jv-envision-photography`
   - Collections will be created automatically

## 🔧 Production Configuration

### Frontend Configuration

1. **Update API URL**
   ```javascript
   // In client/src/components/ContactForm.jsx
   const response = await fetch(`${import.meta.env.VITE_API_URL}/api/contact`, {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json',
     },
     body: JSON.stringify(formData),
   });
   ```

2. **Environment Variables**
   ```bash
   # .env.production
   VITE_API_URL=https://your-backend-url.com
   ```

### Backend Configuration

1. **Production Dependencies**
   ```bash
   cd server
   npm install --production
   ```

2. **Environment Variables**
   ```bash
   # .env.production
   MONGODB_URI=your_production_mongodb_uri
   NODE_ENV=production
   CLIENT_URL=https://your-frontend-url.com
   PORT=5000
   ```

## 🔒 Security Considerations

### SSL/HTTPS
- Ensure all production URLs use HTTPS
- Update CORS settings for production domains
- Use secure MongoDB connection strings

### Environment Variables
- Never commit `.env` files
- Use platform-specific environment variable management
- Rotate secrets regularly

### Rate Limiting
```javascript
// Add to server/index.js for production
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);
```

## 📊 Monitoring & Analytics

### Health Checks
- Backend: `https://your-backend-url.com/api/health`
- Frontend: Monitor build status and uptime

### Error Tracking
- Consider adding Sentry for error tracking
- Monitor MongoDB connection status
- Set up alerts for downtime

## 🚀 Deployment Checklist

### Pre-Deployment
- [ ] Test all functionality locally
- [ ] Verify environment variables
- [ ] Check database connectivity
- [ ] Test contact form submission
- [ ] Verify responsive design
- [ ] Check image optimization

### Post-Deployment
- [ ] Test production URLs
- [ ] Verify SSL certificates
- [ ] Test contact form
- [ ] Check mobile responsiveness
- [ ] Monitor error logs
- [ ] Set up monitoring alerts

## 🔄 CI/CD Pipeline

### GitHub Actions (Optional)

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          working-directory: ./client

  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Render
        uses: johnbeynon/render-deploy-action@v0.0.7
        with:
          service-id: ${{ secrets.RENDER_SERVICE_ID }}
          api-key: ${{ secrets.RENDER_API_KEY }}
```

## 🐛 Troubleshooting

### Common Issues

1. **CORS Errors**
   ```
   Error: Access to fetch at '...' from origin '...' has been blocked by CORS policy
   ```
   **Solution**: Update CLIENT_URL in backend environment variables

2. **MongoDB Connection Issues**
   ```
   Error: MongooseError: Operation `contacts.insertOne()` buffering timed out
   ```
   **Solution**: Check MongoDB Atlas IP whitelist and connection string

3. **Build Failures**
   ```
   Error: Cannot resolve dependency
   ```
   **Solution**: Clear node_modules and reinstall dependencies

4. **Environment Variable Issues**
   ```
   Error: process.env.MONGODB_URI is undefined
   ```
   **Solution**: Verify environment variables are set correctly

### Debug Commands

```bash
# Check backend health
curl https://your-backend-url.com/api/health

# Test MongoDB connection
node -e "console.log(process.env.MONGODB_URI)"

# Check frontend build
cd client && npm run build

# Verify environment variables
echo $MONGODB_URI
```

## 📈 Performance Optimization

### Frontend
- Enable gzip compression
- Use CDN for static assets
- Implement image lazy loading
- Optimize bundle size

### Backend
- Enable compression middleware
- Implement caching headers
- Use MongoDB indexes
- Monitor response times

## 🔄 Updates & Maintenance

### Regular Updates
- Update dependencies monthly
- Monitor security advisories
- Backup database regularly
- Review and rotate secrets

### Scaling Considerations
- Monitor database performance
- Consider CDN for images
- Implement caching strategies
- Plan for traffic spikes

---

**Need Help?** Contact support at hello@jvenvision.com


