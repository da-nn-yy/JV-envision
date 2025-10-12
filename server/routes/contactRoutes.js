const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Contact = require('../models/Contact');

// POST /api/contact - Create new contact inquiry
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, message, serviceType, preferredDate } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and message are required'
      });
    }

    // Check if MongoDB is available
    if (mongoose.connection.readyState === 0) {
      // MongoDB not available - log to console for development
      console.log('📧 Contact Form Submission (Development Mode):');
      console.log('   Name:', name);
      console.log('   Email:', email);
      console.log('   Phone:', phone || 'Not provided');
      console.log('   Message:', message);
      console.log('   Service Type:', serviceType || 'other');
      console.log('   Preferred Date:', preferredDate || 'Not specified');
      console.log('   Timestamp:', new Date().toISOString());
      console.log('---');

      return res.status(201).json({
        success: true,
        message: 'Contact inquiry submitted successfully (development mode)',
        data: {
          name,
          email,
          status: 'received',
          timestamp: new Date().toISOString()
        }
      });
    }

    // Create new contact
    const contact = new Contact({
      name,
      email,
      phone: phone || '',
      message,
      serviceType: serviceType || 'other',
      preferredDate: preferredDate ? new Date(preferredDate) : null
    });

    await contact.save();

    res.status(201).json({
      success: true,
      message: 'Contact inquiry submitted successfully',
      data: {
        id: contact._id,
        name: contact.name,
        email: contact.email,
        status: contact.status,
        createdAt: contact.createdAt
      }
    });

  } catch (error) {
    console.error('Contact submission error:', error);

    // Handle validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors
      });
    }

    // Handle duplicate email errors
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'An inquiry with this email already exists'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Internal server error. Please try again later.'
    });
  }
});

// GET /api/contact - Get all contact inquiries (Admin only - for future use)
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;

    const query = {};
    if (status) {
      query.status = status;
    }

    const contacts = await Contact.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select('-__v');

    const total = await Contact.countDocuments(query);

    res.json({
      success: true,
      data: {
        contacts,
        pagination: {
          current: parseInt(page),
          pages: Math.ceil(total / limit),
          total
        }
      }
    });

  } catch (error) {
    console.error('Get contacts error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// GET /api/contact/:id - Get single contact inquiry
router.get('/:id', async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id).select('-__v');

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact inquiry not found'
      });
    }

    res.json({
      success: true,
      data: contact
    });

  } catch (error) {
    console.error('Get contact error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// PUT /api/contact/:id - Update contact inquiry status (Admin only - for future use)
router.put('/:id', async (req, res) => {
  try {
    const { status, notes } = req.body;

    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact inquiry not found'
      });
    }

    if (status) contact.status = status;
    if (notes) contact.notes = notes;

    await contact.save();

    res.json({
      success: true,
      message: 'Contact inquiry updated successfully',
      data: contact
    });

  } catch (error) {
    console.error('Update contact error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

module.exports = router;
