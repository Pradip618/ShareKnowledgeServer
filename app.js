const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require('./routes');
const mongoURI = require('./config/keys').mongoURI;
const app = express();


app.use(
    bodyParser.json({
      limit: '50mb',
    }),
  );
  // create application/x-www-form-urlencoded parser
  app.use(
    bodyParser.urlencoded({
      limit: '50mb',
      extended: false,
    }),
  );

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

app.use(function(req,res,next){
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers', 'Authorization, Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'DELETE, GET, POST, PUT, PATCH');
    next()
})

app.use('/api',routes);




module.exports = app;