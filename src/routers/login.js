const express = require('express');
const router = new express.Router;
const path = require("path");
const User = require(path.join(__dirname, "../models/user"));
const bcrypt = require("bcryptjs");
const Admin = require(path.join(__dirname, "../models/admin"));

// Check the login of user
router.get("/login", async (req, res) => {
    const user = await User.find({ username: req.body.username });
    const result = await bcrypt.compare(req.body.password, user[0].password);
    if (user[0] && result) {
        res.status(200).send(true);
    } else {
        res.status(400).send(false);
    };
});

// Check the login of admin
router.get("/admin/login", async (req, res) => {
    const admin = await Admin.find({ username: req.body.username });
    const result = await bcrypt.compare(req.body.password, admin[0].password);
    if (admin[0] && result) {
        res.status(200).send(true);
    } else {
        res.status(400).send(false);
    };
});

module.exports = router;