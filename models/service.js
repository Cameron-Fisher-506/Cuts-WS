const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const serviceSchema = new Schema({
    name:{
        type:String
    },
    description:{
        type:String
    },
    price:{
        type:Number
    }
});

const Service = mongoose.model("Service", serviceSchema);

module.exports.serviceSchema = serviceSchema;
module.exports.Service = Service;