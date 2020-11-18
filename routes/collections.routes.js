const express = require('express');
const router = express.Router();

const User = require('../models/User.model');
const Symbol = require('../models/Symbol.model');
const Collection = require('../models/Collection.model');

//POST -> CREATE A NEW COLLECTION
router.post('/api/collections', (req, res, next) => {
    Collection.create(req.body)
        .then(async collectionDoc => {
            await User.findByIdAndUpdate(collectionDoc.user, {$push: {collections: collectionDoc._id}});
            res.status(200).json({ collection: collectionDoc })
        })
        .catch(err => console.log(err));
});

//GET -> GET ALL THE COLLECTIONS
router.get('/api/collections', (req, res) => {
    Collection.find({user: req.user._id})
        .then(collectionsFromDB =>{
            res.status(200).json({ collections: collectionsFromDB })
        })
        .catch(err => next(err));
});

//POST -> DELETE A COLLECTION
router.post('/api/collections/:collectionId/delete', (req, res) => {
    User.findByIdAndUpdate(req.user._id, {$pull: {collections:req.params.collectionId}})
        .then(() => {
            Collection.findByIdAndRemove(req.params.collectionId)
                .then(() => res.json({ message:'Successfully removed!' }))
                .catch(err => next(err));
        }).catch(err => console.log({ err }));
});

//POST -> UPDATE A COLLECTION
router.post('/api/collections/:collectionId/update', (req, res) => {
    Collection.findByIdAndUpdate(req.params.collectionId, req.body, { new:true })
        .then(updatedCollection => {
                res.status(200).json({ collection: updatedCollection })
            })
        .catch(err => next(err));
});

//GET -> GET USER COLLECTIONS DETAILS
router.get('/api/collections/:collectionId', (req, res) => {
        Collection.findById(req.params.collectionId)
        .populate('user')
        .populate('symbols')
        .then(foundCollection => {
            res.status(200).json({ collection: foundCollection })
        })
        .catch(err => next(err));
});

//GET -> GET ALL COLLECTIONS
router.get('/api/allCollections', (req, res) => {
    Collection.find()
    .populate('user')
    .populate('symbols')
        .then(collectionsFromDB =>{
            console.log(collectionsFromDB)
            res.status(200).json({ allCollections: collectionsFromDB })
        })
        .catch(err => console.log(err));
});

//POST -> ADD STOCK TO COLLECTION
router.post('/api/collections/:collectionId/addStock', (req, res) => {
    console.log(req.body)
    Collection.findByIdAndUpdate(req.params.collectionId, {$push: {symbols: req.body.id}} , { new: true })
    .then(updatedCollection => {
        console.log(updatedCollection)
        res.status(200).json({ message:'Stock successfuly added!' })
    })
    .catch(err => console.log(err));
});

module.exports = router ;