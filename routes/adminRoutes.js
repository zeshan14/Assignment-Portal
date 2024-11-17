const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const { acceptAssignment, rejectAssignment } = require('../controllers/adminController');

// Protect routes with middleware
router.use(protect);

// Admin dashboard routes
router.post('/assignments/:id/accept', acceptAssignment);
router.post('/assignments/:id/reject', rejectAssignment);

module.exports = router;
