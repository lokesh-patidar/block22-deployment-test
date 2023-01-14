const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { UserModel } = require("../model/User.model");
require('dotenv').config();

const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
    const { name, email, pass, age } = req.body;

    try {
        bcrypt.hash(pass, 4, async (err, hash) => {
            // Store hash in your password DB.
            if (err) {
                console.log(err);
                res.send("Err");
            } else {
                let user = new UserModel({ name, email, pass: hash, age });
                await user.save();
                res.send("Registered");
                console.log(user);
            }
        });
    } catch (err) {
        res.send("Registration Failed!");
        console.log(err);
    }
});

userRouter.post("/login", async (req, res) => {
    const { email, pass } = req.body;
    try {
        const user = await UserModel.findOne({ email });
        if (user) {
            bcrypt.compare(pass, user.pass, async (err, result) => {
                
                if (result) {
                    const token = jwt.sign({ userID: user._id }, process.env.key);
                    res.send({ msg: "Login Successful", token });
                } 
                else {
                    res.send("Wrong credential!");
                }
            });
        } else {
            res.send("Wrong credential!");
        }
    } catch (err) {
        res.send("Something went wrong!");
        console.log(err);
    }
});

userRouter.get("/data", async (req, res) => {
    try {
        let user = await UserModel.find();
        res.send(user);
        console.log("data is there");
    } catch (err) {
        res.send("Something went wrong!");
        console.log(err);
    }
});

module.exports = {
    userRouter,
};
