const mongoose = require('mongoose');
const Joi = require('joi');

const Material = mongoose.model('Material', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 30,
        unique: true
    },
    description: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 2000,
        trim: true
    }
}));

function validateMaterial (material) {
    const schema = {
        name: Joi.string().min(2).max(30).required(),
        description: Joi.string().min(10).max(250).required()
    };

    return Joi.validate(material, schema);
}

exports.Material = Material;
exports.validate = validateMaterial;
