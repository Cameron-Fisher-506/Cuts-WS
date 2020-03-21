const express = require("express");
const router = express.Router();
const getCurrentDateTime = require("../utils/generalUtils").getCurrentDateTime;
const Company = require("../models/company").Company;
const getObjectId = require("../utils/generalUtils").getObjectId;

router.post("/create", async (req, res) =>{
    let toReturn = {};

    let name = req.body.name;
    let code = req.body.code;
    let latitude = "";
    let longitude = "";
    let address = "";
    let description = "";
    let services = [];
    let createdTime = getCurrentDateTime();

    let company = new Company({
        name,
        code,
        latitude,
        longitude,
        address,
        description,
        services, 
        createdTime
    });

    let result = company.save();
    if(!result)
    {
        console.log("\n\nError: Company not saved" +
        "\nMethod: /create" +
        "\nData: " + company +
        "\ndateTime: " + getCurrentDateTime());

        toReturn.code = -1;
        toReturn.title = "Company did not save successfully";
    }

    toReturn.code = 0;
    toReturn.title = "Company <b>"+name+"</b> saved successfully";
    res.status(200).send(toReturn);
});

router.post("/update", async (req, res) => {
    let toReturn = {};

    let idCompany = getObjectId(req.body.idCompany);
    let latitude = req.body.latitude;
    let longitude = req.body.longitude;
    let address = req.body.address;
    let description = req.body.description;
    let services = req.body.services;

    let company = await Company.findByIdAndUpdate(idCompany, {
        $set:{
            latitude,
            longitude,
            address,
            description,
            services,
        }
    },{new:true});

    if(company == null)
    {
        toReturn.code = -1;
        toReturn.title = "Company does not exist";

        res.status(404).send(toReturn);
        return;
    }
    console.log(company);

    toReturn.code = 0;
    toReturn.title = "Company updated";
    res.status(200).send(toReturn);
});

module.exports = router;