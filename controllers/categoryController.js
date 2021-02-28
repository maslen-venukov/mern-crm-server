const Category = require('../models/Category');
const Position = require('../models/Position');
const responseHandler = require('../utils/responseHandler');

module.exports.getAll = async (req, res) => {
  try {
    const { id: user } = req.user;
    const categories = await Category.find({ user });
    return res.status(200).json(categories);
  } catch (e) {
    console.log(e);
    responseHandler(res, 500, 'Ошибка сервера');
  }
}

module.exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);
    return res.status(200).json(category);
  } catch (e) {
    console.log(e);
    responseHandler(res, 500, 'Ошибка сервера');
  }
}

module.exports.remove = async (req, res) => {
  try {
    const { id } = req.params;
    await Category.deleteOne({ _id: id });
    await Position.deleteMany({ category: id });
    responseHandler(res, 200, 'Категория удалена');
  } catch (e) {
    console.log(e);
    responseHandler(res, 500, 'Ошибка сервера');
  }
}

module.exports.create = async (req, res) => {
  try {
    const { name } = req.body;
    const { file } = req;
    const { id: user } = req.user;
    const category = new Category({
      name,
      imageSrc: file ? file.path : '',
      user
    })
    await category.save();
    return res.status(200).json(category);
  } catch (e) {
    console.log(e);
    responseHandler(res, 500, 'Ошибка сервера');
  }
}

module.exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const { file } = req;

    const updated = { name };

    if(file) {
      updated.imageSrc = req.file.path;
    }

    const category = await Category.findByIdAndUpdate(
      { _id: id },
      { $set: updated },
      { new: true }
    )
    return res.status(200).json(category);
  } catch (e) {
    console.log(e);
    responseHandler(res, 500, 'Ошибка сервера');
  }
}