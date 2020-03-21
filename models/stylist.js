const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const qualificationSchema = require("./qualification").qualificationSchema;

const stylistSchema = new Schema({
    name:{
        type:String
    },
    yearsExperience:{
        type: Number
    },
    mobileNumber:{
        type: String
    },
    username:{
        type: String
    },
    password:{
        type:String
    },
    passwordSalt:{
        type:String
    },
    rating:{
        type:Number
    },
    qualifications: [qualificationSchema],
    idCompany:{
        type: mongoose.Types.ObjectId
    },
    createdTime:{
        type: String
    }
});

const Stylist = mongoose.model("Stylist", stylistSchema);

module.exports.stylistSchema = stylistSchema;
module.exports.Stylist = Stylist;