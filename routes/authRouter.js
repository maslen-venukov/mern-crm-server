const express = require('express');
const authRouter = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

authRouter.post('/login', authController.login);
authRouter.post('/register', authController.register);
authRouter.get('/auth', authMiddleware, authController.auth);

module.exports = authRouter;