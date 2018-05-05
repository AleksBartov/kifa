const { Material, validate } = require('../models/materials');
const mongoose = require('mongoose');
const _ = require('lodash');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let material = new Material({
        name: req.body.name,
        description: req.body.description
    });
    material = await material.save();
    res.send(_.pick(material, ['name']));
});

router.get('/', async (req, res) => {
    const materials = await Material.find().sort('name').select('name -_id');
    res.send(materials);
});

module.exports = router;
