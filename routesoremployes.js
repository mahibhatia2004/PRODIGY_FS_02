const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');
const auth = require('../middleware/auth');

// CRUD Routes
router.get('/', auth, async (req, res) => {
  const employees = await Employee.find();
  res.json(employees);
});

router.post('/', auth, async (req, res) => {
  const newEmp = new Employee(req.body);
  await newEmp.save();
  res.status(201).json(newEmp);
});

router.put('/:id', auth, async (req, res) => {
  const updated = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

router.delete('/:id', auth, async (req, res) => {
  await Employee.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

module.exports = router;