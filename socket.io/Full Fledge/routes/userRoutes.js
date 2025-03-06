// routes/userRoutes.js
const express = require('express');
const { addUser, getUsers } = require('../controllers/userController');
const router = express.Router();

router.post('/addUser', addUser);
router.get('/users', getUsers);

module.exports = router;
