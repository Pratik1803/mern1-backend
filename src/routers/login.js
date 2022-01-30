const express = require('express');
const router = new express.Router;
const path = require("path");
const User = require(path.join(__dirname, "../models/user"));
const bcrypt = require("bcryptjs");
const Admin = require(path.join(__dirname, "../models/admin"));

// Check the login of user
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (user) {
            const result = await bcrypt.compare(req.body.password, user.password);
            if (result) {
                res.status(200).send(true);
            } else {
                res.send(400).send("Password was incorrect!");
            }
        } else {
            res.status(400).send("User Not Found!");
        };
    } catch (error) {
        console.log(error)
    }
    // console.log(user);
    // res.send();
});

// Check the login of admin
router.post("/admin/login", async (req, res) => {
    try {
        const admin = await Admin.findOne({ username: req.body.username });
        if (admin) {
            const result = await bcrypt.compare(req.body.password, admin.password);
            if (result) {
                res.status(200).send(true);
            } else {
                res.status(400).send("Password was incorrect!");
            }
        } else {
            res.status(400).send("User Not Found!");
        };
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;