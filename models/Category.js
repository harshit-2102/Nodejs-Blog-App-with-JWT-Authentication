const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    category: {
        type: String,
        required: [true, 'Please enter an category'],
    },
});

const Category = mongoose.model('category', categorySchema);

module.exports = Category;