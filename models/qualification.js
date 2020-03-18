const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const qualificationSchema = new Schema({
    name:{
        type:String
    },
    institution:{
        type:String
    },
    yearObtained:{
        type:String
    },
    createdTime:{
        type:String
    }
});

const Qualification = mongoose.model("Qualification", qualificationSchema);

module.exports.Qualification = Qualification;
module.exports.qualificationSchema = qualificationSchema;