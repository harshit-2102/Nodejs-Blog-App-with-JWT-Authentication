const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt'); 

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Enter valid email']
    },
    password: {
        type: String,
        required: [true, 'Please enter an password'],
        minlength: [6, 'Minimun password length is 6 characters']
    },
});

// run a function after document saved to db
userSchema.post('save', function (doc, next) {
    console.log('New user created', doc);
    next();  
})

// run a function before document saved to db
userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt); 
    next();  
})

// static method to login user
userSchema.statics.login = async function(email, password){
    const user = await this.findOne({ email });
    if(user){
        const auth = await bcrypt.compare(password, user.password);
        if(auth){
            return user;
        }
        throw Error('Incorrect Password');
    }
    throw Error('Incorrect Email');
}

const User = mongoose.model('users', userSchema);

module.exports = User;