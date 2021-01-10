const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

global.config = require('./src/config');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/testdb' , { useNewUrlParser : true , useUnifiedTopology: true });

app.use(bodyParser.urlencoded({ extended : true}));
app.use(bodyParser.json({ type : 'application/json'}));

const apiRouter = require('./src/routers');
app.use('/api' , apiRouter)

app.listen(config.port , ()=>{
    console.log(`Server is running on port ${config.port}`);
})
