const { Schema, model, ObjectId } = require('mongoose');

const orderSchema = new Schema({
  date: { type: Date, default: Date.now },
  order: { type: Number, required: true },
  list: [{
    name: { type: String },
    quantity: { type: Number },
    cost: { type: Number }
  }],
  user: { type: ObjectId, ref: 'User' }
})

module.exports = model('Order', orderSchema);