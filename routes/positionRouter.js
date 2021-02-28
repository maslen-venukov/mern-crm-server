const express = require('express');
const passport = require('passport');

const positionController = require('../controllers/positionController');

const positionRouter = express.Router();

positionRouter.get('/:categoryId', passport.authenticate('jwt', { session: false }), positionController.getByCategoryId);
positionRouter.post('/', passport.authenticate('jwt', { session: false }), positionController.create);
positionRouter.delete('/:id', passport.authenticate('jwt', { session: false }), positionController.remove);
positionRouter.patch('/:id', passport.authenticate('jwt', { session: false }), positionController.update);

module.exports = positionRouter;