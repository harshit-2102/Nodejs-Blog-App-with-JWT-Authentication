const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema(
    {
        author: {
            type: String,
            required: [true, 'Please enter an author'],
        },
        title: {
            type: String,
            required: [true, 'Please enter an title'],
        },
        description: {
            type: String,
            required: [true, 'Please enter an description'],
        },
        category: {
            type: String,
            required: [true, 'Please enter an category'],
        }
    },
    {
        timestamps: true
    }
);

const Blog = mongoose.model('blog', blogSchema);

module.exports = Blog;