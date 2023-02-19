const User=require("../../models/User");
const express = require("express");
const verify=require("../auth/authverify");
// const router = require("./auth");
const router = express.Router();

router.get("/dashboard",verify, async (req, res) => {
    try{
        const result = await User.find().exec();
        res.send(result);
    }catch (error){
        res.status(500).send(`Error: ${error}`)
    }
});