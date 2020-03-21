const mongoose = require("mongoose");

function connectionToMongoDB()
{
    //let url = "mongodb://localhost:27017/cuts";
    let url = "mongodb+srv://cameron:Cameronbomberfisher_506@cluster0-nnf6g.mongodb.net/test?retryWrites=true&w=majority"
    mongoose.connect(url, {useCreateIndex:true, useNewUrlParser: true, useFindAndModify: false})
        .then(() => console.log("Connected to mongodb..."))
        .catch((err) => console.log(err.message));

        
}

module.exports.connectionToMongoDB = connectionToMongoDB;