const User = require("../models/Users");
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken')

exports.register = async (req, res) => {
    try {
        const {username, password} = req.body;
        const isUser = await User.findOne({username: username});
        if(isUser){
            res.status(400).json({message: "Email already in use"});
        }
        const salt = await bcryptjs.genSalt(10);
        const hashPassword = await bcryptjs.hash(password, salt);

        const newUser = await User.create({username, password: hashPassword});
        res.status(201).json({message: "User created"});

    } catch(error){
        res.status(500).json({error: error.message});
    }
};

exports.login = async (req, res) => {
    try{
        const {username, password} = req.body;
        const user = await User.findOne({username});
        if(!user){
            res.status(400).json({message: "User not found"});
        }
        const isMatch = await bcryptjs.compare(password, user.password);
        if(!isMatch){
            res.status(400).json({message: "Wrong credentials"});
        }

        const token = jwt.sign(
            {id: user._id},
            process.env.JWT_SECRET,
            {expiresIn: "7d"}
        );
        res.json({message: "Login successful", token});
    }catch(error){
        res.status(500).json({error: error.message});
    }
};