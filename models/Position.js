const { Schema, model, ObjectId } = require('mongoose');

const positionSchema = new Schema({
  name: { type: String, required: true },
  cost: { type: Number, required: true },
  category: { type: ObjectId, ref: 'Category'},
  user: { type: ObjectId, ref: 'User'}
})

module.exports = model('Position', positionSchema);