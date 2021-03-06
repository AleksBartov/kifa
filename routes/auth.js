const { User } = require('../models/users');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const mongoose = require('mongoose');
const _ = require('lodash');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send('некорректные email или пароль!');

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(400).send('некорректные email или пароль!');

    const token = user.generateAuthToken();
    res.send(token);
});

function validate (req) {
    const schema = {
        email: Joi.string().min(2).max(50).required().email(),
        password: Joi.string().min(2).max(50).required()
    };
    return Joi.validate(req, schema);
}

module.exports = router;
