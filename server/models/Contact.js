const { initPool, getPool } = require('../db');

const mapRowToContact = (row) => ({
  id: row.id,
  name: row.name,
  email: row.email,
  phone: row.phone || '',
  message: row.message,
  serviceType: row.service_type,
  preferredDate: row.preferred_date,
  status: row.status,
  notes: row.notes,
  createdAt: row.created_at,
  updatedAt: row.updated_at
});

const ensurePool = async () => {
  const poolResult = await initPool();
  if (!poolResult && process.env.NODE_ENV === 'development') {
    return null; // Development mode without database
  }
  return getPool();
};

async function findContactById(id) {
  const pool = await ensurePool();

  if (!pool && process.env.NODE_ENV === 'development') {
    return null;
  }

  const [rows] = await pool.execute(
    `SELECT id, name, email, phone, message, service_type, preferred_date, status, notes, created_at, updated_at
     FROM contacts
     WHERE id = ?`,
    [id]
  );

  if (!rows.length) {
    return null;
  }

  return mapRowToContact(rows[0]);
}

const createContact = async ({ name, email, phone, message, serviceType = 'other', preferredDate = null }) => {
  const pool = await ensurePool();

  // Development mode without database - log to console
  if (!pool && process.env.NODE_ENV === 'development') {
    console.log('📧 Contact Form Submission (Development Mode - No Database):');
    console.log('   Name:', name);
    console.log('   Email:', email);
    console.log('   Phone:', phone || 'Not provided');
    console.log('   Message:', message);
    console.log('   Service Type:', serviceType || 'other');
    console.log('   Preferred Date:', preferredDate || 'Not specified');
    console.log('   Timestamp:', new Date().toISOString());
    console.log('---');

    return {
      id: Date.now(), // Temporary ID
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone || '',
      message: message.trim(),
      serviceType: serviceType || 'other',
      preferredDate: preferredDate || null,
      status: 'new',
      notes: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
  }

  const trimmedName = name.trim();
  const normalizedEmail = email.trim().toLowerCase();
  const trimmedPhone = (phone || '').trim();
  const sanitizedMessage = message.trim();

  const normalizedServiceType = ['wedding', 'portrait', 'event', 'other'].includes(serviceType)
    ? serviceType
    : 'other';

  let preferredDateValue = null;
  if (preferredDate) {
    const parsedDate = new Date(preferredDate);
    if (!Number.isNaN(parsedDate.getTime())) {
      preferredDateValue = parsedDate;
    }
  }

  const [result] = await pool.execute(
    `INSERT INTO contacts
      (name, email, phone, message, service_type, preferred_date)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [
      trimmedName,
      normalizedEmail,
      trimmedPhone,
      sanitizedMessage,
      normalizedServiceType,
      preferredDateValue
    ]
  );

  return findContactById(result.insertId);
};

const countContacts = async (filters = {}) => {
  const pool = await ensurePool();

  if (!pool && process.env.NODE_ENV === 'development') {
    return 0;
  }

  const whereClauses = [];
  const params = [];

  if (filters.status) {
    whereClauses.push('status = ?');
    params.push(filters.status);
  }

  const where = whereClauses.length ? `WHERE ${whereClauses.join(' AND ')}` : '';

  const [[row]] = await pool.execute(
    `SELECT COUNT(*) AS total
     FROM contacts
     ${where}`,
    params
  );

  return row.total;
};

const findContacts = async ({ page = 1, limit = 10, status } = {}) => {
  const pool = await ensurePool();

  if (!pool && process.env.NODE_ENV === 'development') {
    return {
      contacts: [],
      pagination: {
        current: Number(page),
        pages: 0,
        total: 0
      }
    };
  }

  const whereClauses = [];
  const params = [];

  if (status) {
    whereClauses.push('status = ?');
    params.push(status);
  }

  const where = whereClauses.length ? `WHERE ${whereClauses.join(' AND ')}` : '';
  const offset = (page - 1) * limit;

  const [rows] = await pool.execute(
    `SELECT id, name, email, phone, message, service_type, preferred_date, status, notes, created_at, updated_at
     FROM contacts
     ${where}
     ORDER BY created_at DESC
     LIMIT ? OFFSET ?`,
    [...params, Number(limit), offset]
  );

  const total = await countContacts({ status });

  return {
    contacts: rows.map(mapRowToContact),
    pagination: {
      current: Number(page),
      pages: Math.ceil(total / limit) || 1,
      total
    }
  };
};

const updateContact = async (id, { status, notes }) => {
  const pool = await ensurePool();

  if (!pool && process.env.NODE_ENV === 'development') {
    return null;
  }

  const fields = [];
  const params = [];

  if (status) {
    fields.push('status = ?');
    params.push(status);
  }

  if (notes !== undefined) {
    const sanitizedNotes = notes && notes.trim() !== '' ? notes.trim() : null;
    fields.push('notes = ?');
    params.push(sanitizedNotes);
  }

  if (!fields.length) {
    return findContactById(id);
  }

  const [result] = await pool.execute(
    `UPDATE contacts
     SET ${fields.join(', ')}, updated_at = CURRENT_TIMESTAMP
     WHERE id = ?`,
    [...params, id]
  );

  if (result.affectedRows === 0) {
    return null;
  }

  return findContactById(id);
};

module.exports = {
  createContact,
  findContacts,
  findContactById,
  updateContact
};
