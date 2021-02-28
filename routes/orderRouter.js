const express = require('express');
const passport = require('passport');

const orderController = require('../controllers/orderController');

const orderRouter = express.Router();

orderRouter.get('/', passport.authenticate('jwt', { session: false }), orderController.getAll);
orderRouter.post('/', passport.authenticate('jwt', { session: false }), orderController.create);

module.exports = orderRouter;