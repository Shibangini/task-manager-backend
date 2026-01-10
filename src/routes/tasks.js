const express = require('express');
const router = express.Router();
const { createTask, getTasks, updateTask, deleteTask } = require('../controllers/taskController');
const { protect } = require('../middleware/auth');
const { body, param } = require('express-validator');
const validate = require('../middleware/validate');

router.post('/', protect, [
	body('title').notEmpty().withMessage('Title is required'),
	body('description').optional().isString().withMessage('Description must be a string')
], validate, createTask);

router.get('/', protect, getTasks);

router.put('/:id', protect, [
	param('id').isMongoId().withMessage('Invalid task id'),
	body('title').optional().notEmpty().withMessage('Title cannot be empty'),
	body('status').optional().isIn(['pending', 'completed']).withMessage('Status must be pending or completed')
], validate, updateTask);

router.delete('/:id', protect, [
	param('id').isMongoId().withMessage('Invalid task id')
], validate, deleteTask);

module.exports = router;
