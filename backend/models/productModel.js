const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  prodId: {
    type: String,
    required: true,
    unique: true
  },
  prodName: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  }
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;

