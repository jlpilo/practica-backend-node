var express = require('express');
var router = express.Router();

const mongoose = require('mongoose');
const Anuncio = require('../../models/Anuncio');

router.get('/', (req, res, next) => {
    res.json({
        tags: Anuncio.schema.path('tags.0').enumValues
    });
});

module.exports = router;