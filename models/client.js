const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const clientSchema = new Schema({
    name:{
        type:String
    },
    username:{
        type:String
    },
    password:{
        type:String
    },
    passwordSalt:{
        type:String
    },
    mobileNumber:{
        type:String
    },
    rating:{
        type:Number
    },
    createdTime:{
        type:String
    }
});

const Client = mongoose.model("Client", clientSchema);

module.exports.clientSchema = clientSchema;
module.exports.Client = Client;