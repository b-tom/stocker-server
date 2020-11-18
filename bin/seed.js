const mongoose = require('mongoose');
require('dotenv').config();
const Symbol = require('../models/Symbol.model');
require('../configs/db.config');
const axios = require('axios');

axios
    .get('https://finnhub.io/api/v1/stock/symbol?exchange=US&token=bugtt5n48v6vml4i4gkg')
    .then(async responseFromDb => {
        await Symbol.insertMany(responseFromDb.data);
        console.log(responseFromDb)
        mongoose.connection.close();
    })
    .catch(err => {
        console.log(err);
    });


