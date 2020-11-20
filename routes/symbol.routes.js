const express = require('express');
const router = express.Router();

const Symbol = require('../models/Symbol.model');

// GET all symbols
router.get('/api/symbols/limit=:limit&skip=:skip', (req, res, next) => {
    Symbol
        .find()
        .skip(Number(req.params.skip))
        .limit(Number(req.params.limit))
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

//GET symbol data
router.get('/api/search/:searchValue', (req, res) => {
    Symbol.find({symbol:req.params.searchValue, description: req.params.searchValue})
    .then(foundSymbols => {
        res.status(200).json ({ symbols: foundSymbols })
    })
    .catch(err => console.log(err))
});

module.exports = router;