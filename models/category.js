var mongoose = require('mongoose');

var categorySchema = new mongoose.Schema({
  categoryName: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  parentCategory: {
    type: String,
    required: true,
    trim: true
  }
});

var Category = mongoose.model('category', categorySchema);
module.exports = Category;

