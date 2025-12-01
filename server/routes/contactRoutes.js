const express = require('express');
const router = express.Router();
const {
  createContact,
  findContacts,
  findContactById,
  updateContact
} = require('../models/Contact');

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

    const contact = await createContact({
      name,
      email,
      phone: phone || '',
      message,
      serviceType: serviceType || 'other',
      preferredDate: preferredDate || null
    });

    res.status(201).json({
      success: true,
      message: 'Contact inquiry submitted successfully',
      data: contact
    });

  } catch (error) {
    console.error('Contact submission error:', error);

    if (error.code === 'ER_DUP_ENTRY') {
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

    const parsedPage = Math.max(parseInt(page, 10) || 1, 1);
    const parsedLimit = Math.min(Math.max(parseInt(limit, 10) || 10, 1), 100);

    const data = await findContacts({
      page: parsedPage,
      limit: parsedLimit,
      status
    });

    res.json({
      success: true,
      data
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
    const contactId = Number(req.params.id);

    if (Number.isNaN(contactId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid contact id'
      });
    }

    const contact = await findContactById(contactId);

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
    const contactId = Number(req.params.id);
    const { status, notes } = req.body;

    if (Number.isNaN(contactId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid contact id'
      });
    }

    const validStatuses = ['new', 'contacted', 'quoted', 'booked', 'completed'];
    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status value'
      });
    }

    const contact = await updateContact(contactId, { status, notes });

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact inquiry not found'
      });
    }

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
