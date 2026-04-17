const express = require('express');
const router = express.Router();
const { registerUser, loginUser, registerDriver, loginDriver, loginAdmin } = require('../controllers/authController');

router.post('/user/register', registerUser);
router.post('/user/login', loginUser);
router.post('/driver/register', registerDriver);
router.post('/driver/login', loginDriver);
router.post('/admin/login', loginAdmin);

module.exports = router;
