// controllers/adminController.js
const Assignment = require('../models/assignment');
const jwt = require('jsonwebtoken');

// View all assignments for an admin
exports.getAssignments = async (req, res) => {
  const assignments = await Assignment.find({ admin: req.userId });
  res.json(assignments);
};

// Accept assignment
exports.acceptAssignment = async (req, res) => {
  const { id } = req.params;
  const assignment = await Assignment.findById(id);

  if (!assignment) {
    return res.status(404).json({ message: 'Assignment not found' });
  }

  assignment.status = 'accepted';
  await assignment.save();
  res.json({ message: 'Assignment accepted' });
};

// Reject assignment
exports.rejectAssignment = async (req, res) => {
  const { id } = req.params;
  const assignment = await Assignment.findById(id);

  if (!assignment) {
    return res.status(404).json({ message: 'Assignment not found' });
  }

  assignment.status = 'rejected';
  await assignment.save();
  res.json({ message: 'Assignment rejected' });
};
