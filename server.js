const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./src/config/db");
const app = express();
connectDB();
app.use(cors());
app.use(express.json());

// Normalize request URL: strip CR/LF and percent-encoded CR/LF which can
// be introduced by miscopied URLs in tools like Postman (e.g. trailing \r or %0D).
app.use((req, res, next) => {
  if (req.url && /%0A|%0D|\r|\n/.test(req.url)) {
    // sanitize url and path
    req.url = req.url.replace(/%0A|%0D/gi, '').replace(/\r|\n/g, '');
  }
  next();
});

// Simple request logger to assist debugging
app.use((req, res, next) => {
  try {
  console.log(new Date().toISOString(), req.method, req.originalUrl, 'body:', req.body);
  console.log('authorization header:', req.headers.authorization);
  console.log("x-access-token header:", req.headers['x-access-token']);
  } catch (e) {
    console.log('Request log error', e.message);
  }
  next();
});

// Simple request logger to help debug requests from Postman / frontend
app.use((req, res, next) => {
  try {
    console.log(`[req] ${req.method} ${req.originalUrl}`);
    if (req.method === 'POST' || req.method === 'PUT' || req.method === 'PATCH') {
      console.log('[body]', req.body);
    }
  } catch (e) {
    // ignore logging errors
  }
  next();
});

// Routes
app.get('/', (req, res) => res.send('Task Manager API is running'));
const authRoutes = require('./src/routes/auth');
app.use('/api/auth', authRoutes);
const taskRoutes = require('./src/routes/taskRoutes');
app.use('/api/tasks', taskRoutes);

// Basic error handlers
app.use((req, res, next) => {
  res.status(404).json({ message: 'Not Found' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server Error' });
});

const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = app;
