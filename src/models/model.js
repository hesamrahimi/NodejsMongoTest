const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const modelSchema = Schema({
    UserId : { type : Number , required : true },
    ViewDate : [{ type : Date , required : true}] ,
    ProductId : { type : Number , required : true}
});

module.exports = mongoose.model('model' , modelSchema);