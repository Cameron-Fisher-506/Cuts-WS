const express = require("express");
const router = express.Router();
const getCurrentDateTime = require("../utils/generalUtils").getCurrentDateTime;
const Stylist = require("../models/stylist").Stylist;
const Qualification = require("../models/qualification").Qualification;
const hashPassword = require("../utils/generalUtils").hashPassword;
const hashPasswordWithSalt = require("../utils/generalUtils").hashPasswordWithSalt;
const getObjectId = require("../utils/generalUtils").getObjectId;



router.post("/create", async (req, res) =>{
    let toReturn = {};

    let name = req.body.name;
    let username = req.body.username;
    let password = req.body.password;
    let idCompany = req.body.idCompany;

    //hash password
    let passwordObject = await hashPassword(password);
    let passwordHash = passwordObject.passwordHash;
    let passwordSalt = passwordObject.passwordSalt;

    let stylist = new Stylist({
        name: name,
        yearsExperience: 0,
        mobileNumber: "",
        username: username,
        password: passwordHash,
        passwordSalt, passwordSalt,
        rating: 0,
        idCompany:idCompany,
        qualifications: [],
        createdTime: getCurrentDateTime()

    });

    let result = await stylist.save();
    if(!result)
    {
        toReturn.code = -1;
        toReturn.title = "Stylist Not Saved";
        toReturn.message = "Stylist <b>"+stylist.name+"</b> was not saved.";

        res.status(500).send(toReturn);
    }else{
        toReturn.code = 0;
        toReturn.title = "Stylist Saved Successfully";
        toReturn.message = "Stylist <b>"+stylist.name+"</b> was successfully saved.";

        res.status(200).send(toReturn);
    }
});

router.post("/update", async (req, res) =>{

});

router.post("/login", async (req, res) =>{
    let toReturn = {};

    let username = req.body.username;
    let password = req.body.password;
    

    let stylist = await Stylist.findOne({username: username});
    if(stylist == null)
    {
        toReturn.code = -1;
        toReturn.title = "Incorrect Username or Password";
        res.status(404).send(toReturn);
        return;
    }else
    {
        let passwordHash = await hashPasswordWithSalt(password, stylist.passwordSalt);
        if(stylist.password.localeCompare(passwordHash) != 0)
        {
            toReturn.code = -1;
            toReturn.title = "Incorrect Username or Password";
            res.status(404).send(toReturn);
            return;
        }
    }

    toReturn.code = 0;
    res.status(200).send(toReturn);
});

router.get("/isUsernameAvailable/:username", async (req, res) =>{
    let toReturn = {};

    let stylist = await Stylist.findOne({username:req.params.username});
    if(stylist != null)
    {
        toReturn.code = -1;
        toReturn.title = "<b>"+req.params.username+"</b> is taken";

        res.status(404).send(toReturn);
        return;
    }

    toReturn.code = 0;
    toReturn.title = "<b>"+req.params.username+"</b> is available";
    res.status(200).send(toReturn);
});

router.post("/updatePassword", async (req, res) =>{
    let toReturn = {};

    let idStylist = getObjectId(req.body.idStylist);
    let password = req.body.password;

    let passwordObject = await hashPassword(password);
    let passwordSalt = passwordObject.passwordSalt;
    let passwordHash = passwordObject.passwordHash;

    let stylist = await Stylist.findByIdAndUpdate(idStylist, {
        $set:
        {
            password: passwordHash,
            passwordSalt: passwordSalt
        }
    },{new:true})


    if(stylist == null)
    {
        toReturn.code = -1;
        toReturn.title = "<b>"+username+"</b> does not exist";

        res.status(404).send(toReturn);
        return;
    }

    toReturn.code = 0;
    toReturn.title = "<b>"+username+"</b>'s password updated";
    res.status(200).send(toReturn);
});

module.exports = router;