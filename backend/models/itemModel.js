const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const itemSchema = new Schema({
  name: String,
  price: Number,
  category: String,
  forWho: {
    type: String,
    enum: ['men', 'women', 'kids'],
  },
  colour: String,
  desc: String,
  sizes: Array,
  imgs: Array,
});

module.exports = mongoose.model('Item', itemSchema);
