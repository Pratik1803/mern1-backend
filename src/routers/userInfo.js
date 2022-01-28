const express = require('express');
const path = require('path');
const router = new express.Router();
const User = require(path.join(__dirname, "../models/user"));

// To get user by id
router.get("/user", async (req, res) => {
    try {
        const _id = req.body._id;
        const result = await User.find({ _id: _id });
        res.status(200).send(result);
    } catch (error) {
        console.error(error);
        res.status(400).send(undefined);
    }
});

// To update the profile  of user
router.put("/user", async (req, res) => {
    try {
        const _id = req.body._id;
        const loggedInUser = await User.findByIdAndUpdate(_id, req.body, { new: true });
        res.status(202).send(loggedInUser);
    } catch (error) {
        console.error(error)
        res.status(400).send(undefined);
    };
});


module.exports = router;