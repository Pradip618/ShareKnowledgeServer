const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const mongoURI = require('./config/keys').mongoURI;
const app = express();

app.use('/api',routes);


Promise.resolve(app)
                .then(MongooseConnection)
                .catch(err=>console.log('Something went wrong',err));


async function MongooseConnection() {
    await mongoose.connect(mongoURI,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(()=>{
        console.log('MongoDB Connected Successfully')
    })
}

module.exports = app;