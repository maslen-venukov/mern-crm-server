const { Schema, model, ObjectId } = require('mongoose');

const categorySchema = new Schema({
  name: { type: String, required: true },
  imageSrc: { type: String, default: '' },
  user: { type: ObjectId, ref: 'User' }
})

module.exports = model('Category', categorySchema);