const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const collectionSchema = new Schema(
    {
        name: {
            type: String
        },
        description: {
            type: String
        },
        symbols: [{
            type: Schema.Types.ObjectId, ref:'Symbol',
        }],
        totalValue: {
            type: Number,
        },
        user:{
            type: Schema.Types.ObjectId, ref:'User'
        },
        tags: {
            type: [String],
        },
        followers:[{
            type: Schema.Types.ObjectId, ref:'User'
        }]
    },
    {
        timestamps: true
    }
);

module.exports = model('Collection', collectionSchema);