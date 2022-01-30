const express = require('express');
const app = express();
const path = require('path');
const router = new express.Router();
const Message = require(path.join(__dirname, "../models/message"));

router.post("/contact", async (req, res) => {
    try {
        const newMessage = new Message(req.body);
        const result = await newMessage.save();
        res.status(201).send(result)
    } catch (error) {
        console.log(error)
        res.status(400).send(undefined)
    }
})

module.exports = router;