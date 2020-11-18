const express = require('express');
const router = express.Router();

const User = require('../models/User.model');
const Following = require('../models/Following.model');

// POST -> Add a stock to the following list
// <form action='/follow' method='POST'>
router.post('/api/following', (req, res, next) => {
    Following.create(req.body)
        .then(async followingDoc => { 
            await User.findByIdAndUpdate(followingDoc.user, {$push: {stockFollowed: followingDoc._id}});
            res.status(200).json({ stock: followingDoc })
        })
        .catch(err => console.log(err));
});

// GET -> Get all the followed stocks
router.get('/api/following', (req, res) => {
    Following.find({user:req.user._id})
        .populate('symbol')
        .then(stocksFromDB => {
            res.status(200).json({ stocks:stocksFromDB })
        })
        .catch(err => next(err));
});

// POST -> delete a stock from following
// <form action="/following/{{this._id}}/delete" method="post">
router.post('/api/following/:stockId/delete', (req, res) => {

    User.findByIdAndUpdate(req.user._id, {$pull: {stockFollowed: req.params.stockId}})
        .then(() => {
            Following.findByIdAndRemove(req.params.stockId)
                .then(() => res.json({ message:'Successfully removed!' }))
                .catch(err => next(err));
        }).catch(err => console.log({ err }));
});

// POST -> Update the followed stocks
// <form action="/following/{{foundStock._id}}/update" method="POST">
router.post('/api/following/:id/update', (req, res) => {
    Following.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(updatedFollowedStock => res.status(200).json({ stock: updatedFollowedStock }))
        .catch(err => next(err));
});

// GET -> Get the details
router.get('/api/following/:stockId', (req, res) => {
    Following.findById(req.params.stockId)
        .then(foundStock => res.status(200).json({ stock: foundStock }))
        .catch(err => next(err));
});

module.exports = router;