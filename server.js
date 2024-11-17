const express = require('express');
const dotenv = require('dotenv');
const exphbs = require('express-handlebars'); // Correctly import express-handlebars
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize Express app
const app = express();

// Middleware
app.use(express.static('public'));
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // To handle form submissions

// Set up Handlebars view engine using the correct method
const hbs = exphbs.create({
    extname: '.hbs', 
    defaultLayout: 'main', // This tells Express to use main.hbs in layouts folder
    layoutsDir: './views/layouts' 
});

app.engine('hbs', hbs.engine);  // Use hbs.engine method to set it up
app.set('view engine', 'hbs');

// Routes

// Home Route (Main page)
app.get('/', (req, res) => {
    res.render('index', { title: 'Home' });
});

// Login Route
app.get('/login', (req, res) => {
    res.render('login', { title: 'Login' });
});

// Register Route
app.get('/register', (req, res) => {
    res.render('register', { title: 'Register' });
});

// Admin Dashboard Route
app.get('/admin', (req, res) => {
    res.render('admin-dashboard', { title: 'Admin Dashboard' });
});

// Route for handling login form submission (POST)
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    // Authentication logic here
    if (username === 'admin' && password === 'password') {
        res.redirect('/admin'); // Redirect to the admin dashboard if successful
    } else {
        res.render('login', { title: 'Login', error: 'Invalid credentials' });
    }
});

// Route for handling registration form submission (POST)
app.post('/register', (req, res) => {
    const { username, password } = req.body;
    // Registration logic here (e.g., saving the user to a database)
    res.redirect('/login'); // After successful registration, redirect to login page
});

// Admin Dashboard Route for accepting/rejecting assignments (as per your previous example)
app.post('/assignments/:id/accept', (req, res) => {
    // Logic for accepting an assignment
    res.redirect('/admin'); // After accepting, redirect to admin dashboard
});

app.post('/assignments/:id/reject', (req, res) => {
    // Logic for rejecting an assignment
    res.redirect('/admin'); // After rejecting, redirect to admin dashboard
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
