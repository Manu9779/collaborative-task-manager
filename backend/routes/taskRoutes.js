const express = require('express');
const { getTasks, createTask, updateTask, deleteTask } = require('../controllers/taskController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
    .get(protect, getTasks)
    .post(protect, authorize('manager'), createTask);

router.route('/:id')
    .put(protect, updateTask)
    .delete(protect, authorize('manager'), deleteTask);

module.exports = router;
