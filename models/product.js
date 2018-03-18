var mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
  productName: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    trim: true
  }
});

var Product = mongoose.model('product', productSchema);
module.exports = Product;

