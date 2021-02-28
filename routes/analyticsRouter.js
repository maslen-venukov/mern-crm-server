const express = require('express');
const passport = require('passport');
const analyticsRouter = express.Router();
const analyticsController = require('../controllers/analyticsController');

analyticsRouter.get('/overview', passport.authenticate('jwt', { session: false }), analyticsController.overview);
analyticsRouter.get('/analytics', passport.authenticate('jwt', { session: false }), analyticsController.analytics);

module.exports = analyticsRouter;