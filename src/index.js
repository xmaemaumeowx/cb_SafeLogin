// Load environment variables
require('dotenv').config();

const express = require('express');
const path = require('path');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const session = require('express-session');
const config = require('./config');

const app = express();
const PORT = process.env.PORT || 3000;

const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.use(session({
  secret: process.env.SESSION_SECRET || 'supersecretkey',
  resave: false,
  saveUninitialized: false
}));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('MongoDB connected');
  // Start server after DB connection
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
})
.catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});

// Page routes
app.get('/', (req, res) => res.render('login'));
app.get('/login', (req, res) => res.render('login'));
app.get('/signup', (req, res) => res.render('signup'));
app.get('/home', (req, res) => {
  const user = req.session.user || null; // not rendered but available if needed
  res.render('home');
});

// Signup handler
app.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  // Basic validation
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  // Server-side password validation
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const strongPasswordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=\{}\[\]|\\:;"'<>,.?/]).{8,}$/;
  if (!emailPattern.test(email)) {
    return res.status(400).json({ message: 'Invalid email format!' });
  }
  if (!strongPasswordPattern.test(password)) {
    return res.status(400).json({ message: 'Password must be at least 8 characters long, include uppercase, lowercase, number, and special character!' });
  }

  try {
    const existingUser = await config.Login.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new config.Login({ email, password: hashedPassword });
    await newUser.save();
    res.json({ message: 'User successfully added. Please log in.' });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login handler
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }
  try {
    const user = await config.Login.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    req.session.user = { email: user.email };
    res.json({ message: 'Login successful!' });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get current user
app.get('/current-user', (req, res) => {
  res.json({ user: req.session.user || null });
});

// Logout handler
app.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error('Logout error:', err);
    }
    res.redirect('/');
  });
});

// Google OAuth routes
const User = require('./models/user');

app.post('/api/auth/google', async (req, res) => {
  const { id_token } = req.body;
  if (!id_token) {
    return res.status(400).json({ message: 'No ID token provided.' });
  }
  try {
    // Verify the token
    const ticket = await client.verifyIdToken({
      idToken: id_token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const email = payload.email;

    // Find user by username (set to email for Google)
    let user = await User.findOne({ username: email, provider: 'google' });
    if (!user) {
      user = new User({ username: email, provider: 'google' }); // No password field at all
      await user.save();
    }
    req.session.user = { email }; // Optionally, store username here if consistent elsewhere
    res.json({ message: 'Login successful!' });
  } catch (err) {
    console.error('Google Auth error:', err);
    res.status(401).json({ message: 'Google authentication failed.' });
  }
});