// require session
const session = require('express-session');

// require mongostore (if you need it)
const MongoStore = require('connect-mongo')(session);

// require mongoose 
const mongoose = require('mongoose');

 // export the middleware to use it in the app.js
 module.exports = app => {
     app.use(
         session({
             secret: process.env.SESS_SECRET,
             resave: true,
             saveUninitialized: false,
             cookie: {
                 maxAge: 60 * 60 * 24 * 15 * 1000,
                 sameSite: 'lax'
            },
            store: new MongoStore({
                mongooseConnection: mongoose.connection,
                ttl: 60 * 60 * 24 // 1 day
            })
        })
    );
};