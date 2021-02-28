const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const passport = require('passport');
require('dotenv').config();

const authRouter = require('./routes/authRouter');
const analyticsRouter = require('./routes/analyticsRouter');
const categoryRouter = require('./routes/categoryRouter');
const orderRouter = require('./routes/orderRouter');
const positionRouter = require('./routes/positionRouter');

const passportMiddleware = require('./middlewares/passportMiddleware');

const PORT = process.env.PORT || 5000;
const DB_URL = process.env.DB_URL;

const mongoConfig = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
}

const app = express();

mongoose.connect(DB_URL, mongoConfig)
  .then(() => console.log('MongoDB connected'))
  .catch(e => console.log(e));

app.use(cors());
app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
passportMiddleware(passport);

app.use('/api/auth', authRouter);
app.use('/api/analytics', analyticsRouter);
app.use('/api/category', categoryRouter);
app.use('/api/order', orderRouter);
app.use('/api/position', positionRouter);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));