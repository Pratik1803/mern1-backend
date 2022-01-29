const express = require('express');
const app = express();
const path = require('path');
const router = new express.Router();
const User = require(path.join(__dirname, "../models/user"));
const Admin = require(path.join(__dirname, "../models/admin"));
const cors = require("cors");

app.use(cors());


// Get the information of all users
router.get("/signup", async (req, res) => {
    try {
        const users = await User.find();
        res.send("Sign up page")
    } catch (error) {
        console.log(error)
        res.status(400).send(undefined);
    }
});

// Create a new user
router.post('/signup', async (req, res) => {
    try {
        const newUser = new User(req.body);
        const result = await newUser.save();
        res.status(201).send(result);
    } catch (error) {
        console.log(error)
        res.status(400).send(undefined);
    }
});

// Create an Admin
router.post('/admin/signup', async (req, res) => {
    try {
        const newAdmin = new Admin(req.body);
        const result = await newAdmin.save();
        res.status(201).send(result);
    } catch (error) {
        console.log(error)
        res.status(400).send(undefined);
    }
});

module.exports = router;