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
    res.send(_.pick(material, ['name', 'description']));
});

router.get('/', async (req, res) => {
    const materials = await Material.find().sort('name').select('-__v');
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

router.delete('/:id', (req, res) => {
    Material.findByIdAndRemove(req.params.id)
        .then(material => res.send(_.pick(material, ['name'])))
        .catch(err => res.status(404).send('у нас нет таких материалов'));
});

router.get('/:id', (req, res) => {
    Material.findById(req.params.id)
        .then(material => res.send(_.pick(material, ['name', '_id', 'description'])))
        .catch(err => res.status(404).send('у нас нет таких материалов'));
});

module.exports = router;
