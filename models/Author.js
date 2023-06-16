const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter an name'],
    },
});

const Author = mongoose.model('author', authorSchema);

module.exports = Author;