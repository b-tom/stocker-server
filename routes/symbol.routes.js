const express = require('express');
const router = express.Router();

const Symbol = require('../models/Symbol.model');

// GET all symbols
router.get('/api/symbols/limit=:limit&skip=:skip', (req, res, next) => {
    Symbol.find().limit(Number(req.params.limit))
        .then(symbolDoc => {
            res.status(200).json({ symbol:symbolDoc })
        })
        .catch(err => next(err));
});

//GET symbol data
router.get('/api/symbols/:id', (req, res) => {
    Symbol.findById(req.params.id)
    .then(foundSymbol => {
        res.status(200).json ({ symbol: foundSymbol })
    })
    .catch(err => console.log(err))
})

module.exports = router;