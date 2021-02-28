const express = require('express');
const passport = require('passport');

const categoryController = require('../controllers/categoryController');
const uploadMiddleware = require('../middlewares/uploadMiddleware');

const categoryRouter = express.Router();

categoryRouter.get('/', passport.authenticate('jwt', { session: false }), categoryController.getAll);
categoryRouter.get('/:id', passport.authenticate('jwt', { session: false }), categoryController.getById);
categoryRouter.delete('/:id', passport.authenticate('jwt', { session: false }), categoryController.remove);
categoryRouter.post('/', passport.authenticate('jwt', { session: false }), uploadMiddleware.single('image'), categoryController.create);
categoryRouter.patch('/:id', passport.authenticate('jwt', { session: false }), uploadMiddleware.single('image'), categoryController.update);

module.exports = categoryRouter;