// server/index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { createClient } = require('@supabase/supabase-js');

const app = express();

// CORS configuration
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Make sure this comes before your routes
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(bodyParser.json());

// Initialize Supabase client
const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

// Middleware
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? 'your-production-domain.com' 
    : 'http://localhost:5173'
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

// Journal Details Endpoints
// Get all journal entries with optional filters
app.get('/api/journal-details', async (req, res, next) => {
  try {
    const { 
      startDate, 
      endDate, 
      class: journalClass, 
      user,
      minAmount,
      maxAmount 
    } = req.query;

    let query = supabase
      .from('journal_details')
      .select('*');

    // Apply filters if they exist
    if (startDate) query = query.gte('entry_date', startDate);
    if (endDate) query = query.lte('entry_date', endDate);
    if (journalClass) query = query.eq('class', journalClass);
    if (user) query = query.eq('user_name', user);
    if (minAmount) query = query.gte('amount', minAmount);
    if (maxAmount) query = query.lte('amount', maxAmount);

    const { data, error } = await query.order('journal_id', { ascending: true });

    if (error) throw error;
    res.json(data);
  } catch (error) {
    next(error);
  }
});

// Get journal entry by ID
app.get('/api/journal-details/:id', async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from('journal_details')
      .select('*')
      .eq('journal_id', req.params.id)
      .single();

    if (error) throw error;
    res.json(data);
  } catch (error) {
    next(error);
  }
});

// ADA 1 Main Endpoints
// Get all ADA 1 main records
app.get('/api/ada-1-main', async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from('ada_1_main')
      .select('*')
      .order('effective_date', { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (error) {
    next(error);
  }
});

// Insert new ADA 1 main record
app.post('/api/ada-1-main', async (req, res, next) => {
  try {
    const { amount, count, effective_date } = req.body;

    const { data, error } = await supabase
      .from('ada_1_main')
      .insert([{ amount, count, effective_date }])
      .select();

    if (error) throw error;
    res.json(data);
  } catch (error) {
    next(error);
  }
});

// ADA 1 Histogram Endpoints
// Get histogram data
app.get('/api/ada-1-histogram', async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from('ada_1_histogram')
      .select('*')
      .order('bucket_start', { ascending: true });

    if (error) throw error;
    res.json(data);
  } catch (error) {
    next(error);
  }
});

// Insert histogram bucket
app.post('/api/ada-1-histogram', async (req, res, next) => {
  try {
    const { bucket_start, bucket_end, sum_amount, count } = req.body;

    const { data, error } = await supabase
      .from('ada_1_histogram')
      .insert([{ bucket_start, bucket_end, sum_amount, count }])
      .select();

    if (error) throw error;
    res.json(data);
  } catch (error) {
    next(error);
  }
});

// Analytics Endpoints
// Get date difference analysis
app.get('/api/analytics/date-differences', async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from('journal_details')
      .select('date_difference, count(*)')
      .gt('date_difference', 0)
      .group('date_difference')
      .order('date_difference', { ascending: true });

    if (error) throw error;
    res.json(data);
  } catch (error) {
    next(error);
  }
});

// Get user activity summary
app.get('/api/analytics/user-activity', async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from('journal_details')
      .select('user_name, count(*), sum(amount)')
      .group('user_name')
      .order('count', { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (error) {
    next(error);
  }
});

// Error handling middleware
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error' 
  });
};

app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});