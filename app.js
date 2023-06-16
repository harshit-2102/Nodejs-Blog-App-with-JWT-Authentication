const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const blogRoutes = require('./routes/blogRoutes');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');
const bodyParser = require('body-parser');

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
app.use("/css", express.static(path.join(__dirname, "node_modules/bootstrap/dist/css")))
app.use("/js", express.static(path.join(__dirname, "node_modules/bootstrap/dist/js")))
app.use("/js", express.static(path.join(__dirname, "node_modules/jquery/dist")))
app.use(bodyParser.urlencoded({ extended: false }));


// view engine
app.set('view engine', 'ejs');

// routes
app.get('*', checkUser);
app.use(authRoutes);
app.use(blogRoutes);

const dbURI = 'mongodb+srv://Harshit:1234@cluster0.3acptt5.mongodb.net/blogsApp';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
        app.listen(5000);
        console.log("app is listening on port 5000!");
    })
    .catch((err) => console.log(err));


