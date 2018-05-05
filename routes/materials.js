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
    const materials = await Material.find().sort('name');
    res.send(materials);
});

router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const material = await Material.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        description: req.body.description
    }, {new: true});
    if (!material) return res.status(404).send('у нас нет таких материалов');

    res.send(material);
});

router.delete('/:id', async (req, res) => {
    const material = await Material.findByIdAndRemove(req.params.id);
    if (!material) return res.status(404).send('у нас нет таких материалов');

    res.send(material);
});

router.get('/:id', async (req, res) => {
    const material = await Material.findById(req.params.id);
    if (!material) return res.status(404).send('у нас нет таких материалов');

    res.send(material);
});

module.exports = router;
