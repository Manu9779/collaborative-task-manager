const Task = require('../models/Task');
const ActivityLog = require('../models/ActivityLog');

// @desc    Get all tasks
// @route   GET /api/tasks
// @access  Private (Manager sees all, User sees assigned)
const getTasks = async (req, res) => {
    try {
        let tasks;
        if (req.user.role === 'manager') {
            tasks = await Task.find().populate('assignedTo', 'name email');
        } else {
            tasks = await Task.find({ assignedTo: req.user._id }).populate('assignedTo', 'name email');
        }
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a task
// @route   POST /api/tasks
// @access  Private (Manager only)
const createTask = async (req, res) => {
    try {
        const { title, description, status, priority, dueDate, assignedTo } = req.body;

        const task = await Task.create({
            title,
            description,
            status,
            priority,
            dueDate,
            createdBy: req.user._id,
            assignedTo,
        });

        await ActivityLog.create({
            action: 'Task Created',
            taskId: task._id,
            performedBy: req.user._id,
            details: `Task "${title}" created by ${req.user.name}`,
        });

        res.status(201).json(task);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update task
// @route   PUT /api/tasks/:id
// @access  Private
const updateTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        // Manager can update everything
        if (req.user.role === 'manager') {
            const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
            });
            await ActivityLog.create({
                action: 'Task Updated',
                taskId: updatedTask._id,
                performedBy: req.user._id,
                details: `Task details updated by Manager ${req.user.name}`,
            });

            return res.json(updatedTask);
        }

        // User can only update status
        if (task.assignedTo.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to update this task' });
        }

        // Only allow status update for regular users
        if (req.body.status) {
            task.status = req.body.status;
            await task.save();
            await ActivityLog.create({
                action: 'Status Updated',
                taskId: task._id,
                performedBy: req.user._id,
                details: `Status changed to ${req.body.status} by ${req.user.name}`,
            });

            return res.json(task);
        } else {
            return res.status(403).json({ message: 'Users can only update status' });
        }

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete task
// @route   DELETE /api/tasks/:id
// @access  Private (Manager only)
const deleteTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        await Task.deleteOne({ _id: req.params.id });
        res.json({ message: 'Task removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getTasks, createTask, updateTask, deleteTask };
