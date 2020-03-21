const moment = require("moment");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

function getCurrentDateTime()
{
    return moment().format('YYYY-MM-DD HH:mm:ss');
}

async function hashPassword(password)
{
    let toReturn = {};
    let saltRounds = 10;

    try{
        toReturn.passwordSalt = await bcrypt.genSalt(saltRounds);
        toReturn.passwordHash = await bcrypt.hash(password, toReturn.passwordSalt);
    }catch(e)
    {
        console.log("\n\nError: " + e +
        "\nMethod: hashPassword" +
        "\nPassword: " + password +
        "\ndateTime: " + getCurrentDateTime());
    }
    
    return toReturn;
}

async function hashPasswordWithSalt(password, salt)
{
    let toReturn = "";

    try{
        toReturn= await bcrypt.hash(password, salt);
    }catch(e)
    {
        console.log("\n\nError: " + e +
        "\nMethod: hashPassword" +
        "\nPassword: " + password +
        "\nSalt: " + salt +
        "\ndateTime: " + getCurrentDateTime());
    }
    
    return toReturn;
}

function getObjectId(id)
{
    let toReturn = null;

    toReturn = mongoose.Types.ObjectId(id);

    return toReturn;
}


module.exports.getCurrentDateTime = getCurrentDateTime;
module.exports.hashPassword = hashPassword;
module.exports.hashPasswordWithSalt = hashPasswordWithSalt;
module.exports.getObjectId = getObjectId;