const Position = require('../models/Position');

const responseHandler = require('../utils/responseHandler');

module.exports.getByCategoryId = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const { id: userId } = req.user;

    const positions = await Position.find({ category: categoryId, user: userId });
    return res.status(200).json(positions);
  } catch (e) {
    console.log(e);
    responseHandler(res, 500, 'Ошибка сервера');
  }
}

module.exports.create = async (req, res) => {
  try {
    const { name, cost, category } = req.body;
    const { id: user } = req.user;

    const position = new Position({
      name,
      cost,
      category,
      user
    })

    await position.save();
    return res.status(200).json(position);
  } catch (e) {
    console.log(e);
    responseHandler(res, 500, 'Ошибка сервера');
  }
}

module.exports.remove = async (req, res) => {
  try {
    const { id } = req.params;
    await Position.deleteOne({ _id: id });
    responseHandler(res, 200, 'Позиция удалена');
  } catch (e) {
    console.log(e);
    responseHandler(res, 500, 'Ошибка сервера');
  }
}

module.exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const position = await Position.findOneAndUpdate({ id }, { $set: req.body }, { new: true });
    return res.status(200).json(position);
  } catch (e) {
    console.log(e);
    responseHandler(res, 500, 'Ошибка сервера');
  }
}