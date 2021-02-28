const Order = require('../models/Order');
const responseHandler = require('../utils/responseHandler');
const getTotalPrice = require('../utils/getTotalPrice');
const convertDate = require('../utils/convertDate');

module.exports.overview = async (req, res) => {
  try {
    const { id: user } = req.user;
    const orders = await Order.find({ user });

    const yesterday = new Date().setDate(new Date().getDate() - 1);

    const yesterdayOrders = orders.filter(order => new Date(order.date).toDateString() === new Date(yesterday).toDateString());

    const yesterdayIncome = yesterdayOrders.reduce((sum, next) => sum += getTotalPrice(next.list), 0);
    const allIncome = orders.reduce((sum, next) => sum += getTotalPrice(next.list), 0);
    const avgIncome = Math.round(allIncome / orders.length);

    const daysSinceFirstOrder = Math.floor((+new Date() - +orders[0].date) / 1000 / 3600 / 24);
    const avgOrders = Math.round(orders.length / daysSinceFirstOrder);

    const incomeCoef = Math.round((yesterdayIncome / avgIncome) * 100) / 100;
    const ordersCoef = yesterdayOrders.length / avgOrders;

    const data = {
      income: {
        income: yesterdayIncome,
        avgIncome,
        coef: incomeCoef,
      },
      orders: {
        ordersQuantity: yesterdayOrders.length,
        avgOrders,
        coef: ordersCoef
      }
    }

    return res.json(data);
  } catch (e) {
    console.log(e);
    responseHandler(res, 500, 'Ошибка сервера');
  }
}

module.exports.analytics = async (req, res) => {
  try {
    const { id: user } = req.user;
    const orders = await Order.find({ user });

    const dates = [...new Set(orders.map(order => convertDate(order.date)))];

    const incomes = dates.map(date => {
      const thisDateOrders = orders.filter(order => convertDate(order.date) === date);
      const totalPrice = thisDateOrders.reduce((sum, next) => sum += getTotalPrice(next.list), 0);
      return totalPrice;
    })

    const avgIncome = Math.round(incomes.reduce((prev, next) => (prev + next) / 2));

    const ordersQuantity = dates.map(date => {
      const thisDateOrders = orders.filter(order => convertDate(order.date) === date);
      return thisDateOrders.length;
    })

    const avgOrders = Math.round(ordersQuantity.reduce((prev, next) => (prev + next) / 2));

    const data = {
      dates,
      incomes,
      avgIncome,
      orders: ordersQuantity,
      avgOrders
    }

    res.json(data);
  } catch (e) {
    console.log(e);
    responseHandler(res, 500, 'Ошибка сервера');
  }
}