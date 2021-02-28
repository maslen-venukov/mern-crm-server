const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_KEY = process.env.JWT_KEY;

const responseHandler = require('../utils/responseHandler');

const authMiddleware = (req, res, next) => {
  if(req.method === 'OPTIONS') {
    return next();
  }

  try {
    const token = req.headers.authorization.split(' ')[1];
    if(!token) {
      responseHandler(res, 400, 'Ошибка авторизации');
    }

    const decoded = jwt.verify(token, JWT_KEY);
    req.user = decoded;

    next();
  } catch (e) {
    console.log(e);
    responseHandler(res, 400, 'Ошибка авторизации');
  }
}

module.exports = authMiddleware;