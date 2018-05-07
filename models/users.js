const mongoose = require('mongoose');
const Joi = require('joi');
const config = require('config');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 30
    },
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 50,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 1000
    }    
});

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, config.get('jwtPrivateKey'));
    return token;
}

const User = mongoose.model('User', userSchema);

function validateUser (user) {
    const schema = {
        name: Joi.string().min(2).max(30).required(),
        email: Joi.string().min(2).max(50).required().email(),
        password: Joi.string().min(2).max(50).required()
    };
    return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;
