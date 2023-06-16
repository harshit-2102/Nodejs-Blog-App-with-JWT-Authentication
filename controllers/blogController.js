const Category = require('../models/Category');
const Blog = require('../models/Blog');
const User = require('../models/User');



module.exports.get_Blogs = async (req, res) => {
    const blogs = await Blog.find()
        .sort({ createdAt: -1 })
        .then((blog) => {
            return blog;
        }).catch((err) => {
            console.log(err);
        });

    res.render('home', {
        pageTitle: "Blogs",
        blogs: blogs
    });
}

module.exports.get_addRecord = async (req, res) => {
    const authors = await User.find()
        .then((authors) => {
            return authors;
        }).catch((err) => {
            console.log(err);
        });

    const categories = await Category.find()
        .then((categories) => {
            return categories;
        }).catch((err) => {
            console.log(err);
        });

    const authorName = req.query.author;
    const categoryName = req.query.category;
    // console.log(authorName);
    let blogs;
    if (authorName) {
        blogs = await Blog.find({author: authorName})
        .sort({ createdAt: -1 })
        .then((blog) => {
            return blog;
        }).catch((err) => {
            console.log(err);
        });
    } else if(categoryName){
        blogs = await Blog.find({category: categoryName})
        .sort({ createdAt: -1 })
        .then((blog) => {
            return blog;
        }).catch((err) => {
            console.log(err);
        });
    } 
    else {
        blogs = await Blog.find()
            .sort({ createdAt: -1 })
            .then((blog) => {
                return blog;
            }).catch((err) => {
                console.log(err);
            });
    }


    // console.log(authors);
    res.render('addRecord', {
        pageTitle: 'Add and Manage Records',
        authors: authors,
        categories: categories,
        blogs: blogs
    });
}

module.exports.post_addBlog = (req, res) => {
    const { author, title, description, category } = req.body;
    const blog = new Blog({
        author: author,
        title: title,
        description: description,
        category: category
    });
    blog.save()
        .then((result) => {
            console.log(result);
            res.redirect('/add-record');
        }).catch((err) => {
            console.log(err.code);
            res.redirect('/add-record');
        });
}

module.exports.post_addCategory = (req, res) => {
    const { addcategory } = req.body;
    console.log(addcategory);
    const category = new Category({
        category: addcategory
    });
    category.save()
        .then((result) => {
            console.log(result);
            res.redirect('/add-record');
        }).catch((err) => {
            res.redirect('/add-record');
            // console.log(err.code);
            if (err.code == 11000) {
                console.log("Add unique Category");
            }
        });
};

exports.get_editBlog = async (req, res) => {
    const blogId = req.params.blogId;

    const authors = await User.find()
        .then((authors) => {
            return authors;
        }).catch((err) => {
            console.log(err);
        });

    const categories = await Category.find()
        .then((categories) => {
            return categories;
        }).catch((err) => {
            console.log(err);
        });
    Blog.findById(blogId)
        .then(blog => {
            if (!blog) {
                return res.redirect('/add-record');
            }
            res.render('editBlog', {
                pageTitle: 'Edit Blog',
                blog: blog,
                authors: authors,
                categories: categories,
            });
        })
        .catch(err => console.log(err));
};

module.exports.post_editBlog = (req, res) => {
    const { blogId, author, title, description, category } = req.body;

    Blog.findById(blogId)
        .then(blog => {
            blog.author = author;
            blog.title = title;
            blog.description = description;
            blog.category = category;
            return blog.save();
        })
        .then(result => {
            console.log('UPDATED PRODUCT!');
            res.redirect('/add-record');
        })
        .catch(err => console.log(err));
}

module.exports.delete_blog = (req, res, next) => {
    const blogId = req.body.blogId;
    Blog.findByIdAndRemove(blogId)
        .then(() => {
            console.log('DESTROYED PRODUCT');
            res.redirect('/add-record');
        })
        .catch(err => console.log(err));
};