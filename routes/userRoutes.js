// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { register, login, renderLogin } = require('../controllers/userController');

// GET login page
router.get('/login', renderLogin);

// POST login
router.post('/login', login);

// POST register
router.post('/register', register);

module.exports = router;
