const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const User = require('../models/User');

const responseHandler = require('../utils/responseHandler');

const JWT_KEY = process.env.JWT_KEY;

module.exports.login = async (req, res) => {
  const { email, password } = req.body;

  if(!email || !password) {
    responseHandler(res, 400, 'Заполните все поля');
  }

  const user = await User.findOne({ email });
  if(!user) {
    responseHandler(res, 404, 'Пользователь с таким email не найден');
  }

  const isPasswordValid = bcrypt.compareSync(password, user.password);
  if(!isPasswordValid) {
    responseHandler(res, 400, 'Неверный пароль');
  }

  const token = jwt.sign({ id: user.id, email: user.email }, JWT_KEY, { expiresIn: '1h' });

  return res.json({
    token: `Bearer ${token}`,
    user: {
      id: user.id,
      email: user.email
    }
  })
}

module.exports.register = async (req, res) => {
  const { email, password, passwordVerify } = req.body;

  if(!email || !password || !passwordVerify) {
    responseHandler(res, 400, 'Заполните все поля');
  }

  const emailRegExp =  /\S+@\S+\.\S+/;
  if(!emailRegExp.test(email)) {
    responseHandler(res, 400, 'Введите корректный email');
  }

  if(password !== passwordVerify) {
    responseHandler(res, 400, 'Пароли не совпадают');
  }

  if(password.length < 5) {
    responseHandler(res, 400, 'Длина пароля должна быть не менее 5 символов');
  }

  const candidate = await User.findOne({ email });
  if(candidate) {
    responseHandler(res, 400, 'Пользователь с таким email уже зарегистрирован');
  }

  const salt = bcrypt.genSaltSync(5);
  const hashedPassword = bcrypt.hashSync(password, salt);

  const user = new User({
    email,
    password: hashedPassword
  })

  await user.save();
  responseHandler(res, 200, 'Пользователь успешно зарегистрирован');
}

module.exports.auth = async (req, res) => {
  try {
    const { id: _id } = req.user;
    const user = await User.findOne({ _id });
    const token = `Bearer ${jwt.sign({ id: user.id }, JWT_KEY, { expiresIn: '1h' })}`;
    return res.json({
      token,
      user: {
        id: user.id,
        email: user.email
      }
    })
  } catch (e) {
    console.log(e);
    responseHandler(res, 500, 'Ошибка сервера')
  }
}