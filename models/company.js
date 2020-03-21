const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const serviceSchema = require("./service").serviceSchema;

const companySchema = new Schema({
    name: {
        type:String
    },
    code:{
        type:String
    },
    latitude:{
        type:String
    },
    longitude:{
        type:String
    },
    address:{
        type:String
    },
    description:{
        type:String
    },
    services: [serviceSchema],
    createdTime:{
        type:String
    }
});

const Company = mongoose.model("Company", companySchema);

module.exports.companySchema = companySchema;
module.exports.Company = Company;