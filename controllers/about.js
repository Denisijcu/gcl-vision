'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const router = express.Router();

router.use(bodyParser.json());

router.get('/about', (req, res, next) => {
    res.render('about');
});

module.exports = router;
