const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const qualificationSchema = require("./qualification").qualificationSchema;

const stylistSchema = new Schema({
    name:{
        type:String
    },
    lastname:{
        type:String
    },
    yearsExperience:{
        type: Number
    },
    mobileNumber:{
        type: Number
    },
    qualifications: [qualificationSchema],
    createdTime:{
        type: String
    }
});

const Stylist = mongoose.model("Stylist", stylistSchema);

module.exports.stylistSchema = stylistSchema;
module.exports.Stylist = Stylist;