const mongoose = require("mongoose");

function connectionToMongoDB()
{
    let url = "mongodb://localhost:27017/cuts";
    mongoose.connect(url, {useCreateIndex:true, useNewUrlParser: true, useFindAndModify: false})
        .then(() => console.log("Connected to mongodb..."))
        .catch((err) => console.log(err.message));

        
}

module.exports.connectionToMongoDB = connectionToMongoDB;