const { Schema, model } = require('mongoose');

const symbolSchema = new Schema(
    {
        symbol: {
            type: String,
        },
        description: {
            type: String,
        },
        displaySymbol: {
            type: String,
        },
        type: {
            type: String,
        },
        currency: {
            type: String,
        },
    },
    {
        timestamps: true
    }
);

module.exports = model('Symbol', symbolSchema);