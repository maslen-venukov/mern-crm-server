const Order = require('../models/Order');
const responseHandler = require('../utils/responseHandler');

module.exports.getAll = async (req, res) => {
  try {
    const { id: user } = req.user;
    const { start, end, order, offset, limit } = req.query;

    const query = { user };

    if(start) {
      query.date = { $gte: start }
    }

    if(end) {
      if(!query.date) {
        query.date = {};
      }
      query.date['$lte'] = end;
    }

    if(order) {
      query.order = +order;
    }

    const orders = await Order
      .find(query)
      .sort({ date: -1 })
      .skip(+offset)
      .limit(+limit);

    return res.status(200).json(orders);
  } catch (e) {
    console.log(e);
    responseHandler(res, 500, 'Ошибка сервера');
  }
}

module.exports.create = async (req, res) => {
  try {
    const { list } = req.body;
    const { id: user } = req.user;

    const lastOrder = await Order.findOne({ user }).sort({ date: -1 });
    const maxOrder = lastOrder ? lastOrder.order : 0;

    const order = new Order({
      list,
      user,
      order: maxOrder + 1
    })

    await order.save();
    return res.status(200).json(order);
  } catch (e) {
    console.log(e);
    responseHandler(res, 500, 'Ошибка сервера');
  }
}