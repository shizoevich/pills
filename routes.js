const express = require('express');
const router = express.Router();
const UserController = require('./contrller');

router.post('/User', UserController.createUser);
router.put('/User/:id', UserController.updateUser);
router.delete('/User/:id', UserController.deleteUser);
router.post('/User/register', UserController.registerUser);
router.get('/User/:id', UserController.getUser);
router.post('/User/login', UserController.loginUser);

module.exports = router;