const express = require('express');
const { registerUser, authUser, getUsers } = require('../controllers/authController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/signup', registerUser);
router.post('/login', authUser);
router.get('/users', protect, authorize('manager'), getUsers);

module.exports = router;
