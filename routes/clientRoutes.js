const express = require("express");
const router = express.Router();
const getCurrentDateTime = require("../utils/generalUtils").getCurrentDateTime;
const hashPassword = require("../utils/generalUtils").hashPassword;
const hashPasswordWithSalt = require("../utils/generalUtils").hashPasswordWithSalt;
const getObjectId = require("../utils/generalUtils").getObjectId;
const Client = require("../models/client").Client;

router.post("/register", async (req, res) =>{
    let toReturn = {};

    let name = req.body.name;
    let username = req.body.username;
    let password = req.body.password;
    let mobileNumber = req.body.mobileNumber;
    let rating = 0;
    let createdTime = getCurrentDateTime();

    let passwordObject = await hashPassword(password);
    let passwordSalt = passwordObject.passwordSalt;
    let passwordHash = passwordObject.passwordHash;

    let client = new Client({
        name,
        username,
        password:passwordHash,
        passwordSalt,
        mobileNumber,
        rating,
        createdTime
    });

    let result = client.save();
    if(!result)
    {
        toReturn.code = -1;
        toReturn.title = "Your registration was not successful";

        res.status(404).send(toReturn);
        return;
    }

    toReturn.code = 0;
    toReturn.title = "Registration successful";
    res.status(200).send(toReturn);
});

router.post("/login", async (req, res) =>{
    let toReturn = {};

    let username = req.body.username;
    let password = req.body.password;

    let client = await Client.findOne({username:username});
    if(client != "undefined")
    {
        let clientPassword = client.password;
        let passwordSalt = client.passwordSalt;
        let passwordHash = await hashPasswordWithSalt(password, passwordSalt);

        if(clientPassword.localeCompare(passwordHash) != 0)
        {
            console.log("\n\nError: Password incorrect" +
            "\nMethod: /login" +
            "\nUsername: " + username +
            "\nPassword: " + password +
            "\nPasswordHash: " + passwordHash +
            "\nPasswordSalt: " + passwordSalt + 
            "\ndateTime: " + getCurrentDateTime());
    

            toReturn.code = -1;
            toReturn.title = "Incorrect Username or Password";
            res.status(404).send(toReturn);
            return;
        }
    }else
    {
        console.log("\n\nError: Client not found" +
        "\nMethod: /login" +
        "\nUsername: " + username +
        "\nPassword: " + password +
        "\nPasswordHash: " + passwordHash +
        "\nPasswordSalt: " + passwordSalt + 
        "\ndateTime: " + getCurrentDateTime());

        toReturn.code = -1;
        toReturn.title = "Incorrect Username or Password";
        res.status(404).send(toReturn);
        return;
    }

    toReturn.code = 0;
    toReturn.title = "Login successful";
    res.status(200).send(toReturn);
});

router.post("/updatePassword", async (req, res) =>{
    let toReturn = {};

    let idClient = getObjectId(req.body.idClient);
    
    let passwordObject = await hashPassword(req.body.password);
    let passwordHash = passwordObject.passwordHash;
    let passwordSalt = passwordObject.passwordSalt;

    let client = await Client.findByIdAndUpdate(idClient, {
        $set:{
            password:passwordHash,
            passwordSalt
        }
    }, {new:true});

    if(!client)
    {
        console.log("Error: Client not found" +
            "\nMethod: updatePassword" +
            "\nPasswod: " + password +
            "\ncreatedTime: " + getCurrentDateTime
        );

        toReturn.code = -1;
        toReturn.title = "Incorrect Username or Password";
        res.status(404).send(toReturn);
        return;
    }

    toReturn.code = 0;
    toReturn.title = "Password updated successfully";
    res.status(200).send(toReturn);
});

module.exports = router;