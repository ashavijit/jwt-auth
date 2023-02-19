const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Joi = require('@hapi/joi');

const schema = Joi.object({
    fname: Joi.string().min(6).max(255).required(),
    lname: Joi.string().min(6).max(255).required(),
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required()

});

router.post('/register', async (req, res) => {
    const emailisthere = await User.findOne({email: req.body.email});
    if(emailisthere) return res.status(400).send('Email already exists');

});

const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(req.body.password, salt);


const User = new User({
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    password: hashedPassword
});

try{
    const {error} = schema.validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    const savedUser = await user.save();
    res.send({user: user._id});
}catch(err){
    res.status(400).send(err);
}

const loginschema = Joi.object({
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required()
});

router.post('/login', async (req, res) => {
    const User=await User.findOne({email: req.body.email});
    if(!User) return res.status(400).send('Email is not found');

    const validPass = await bcrypt.compare(req.body.password, User.password);
    if(!validPass) return res.status(400).send('Invalid password');
});

try {
    

    const { error } = await loginSchema.validateAsync(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    else {
      
      const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
      res.header("auth-token", token).send(token);
    }
  } catch (error) {
    res.status(500).send(error);
  }

module.exports = router;