const express = require("express");
const app = express();
const path = require("path");
const User = require(path.join(__dirname, "./models/user"));
const Message = require(path.join(__dirname, "./models/message"));
const loginRouter = require("./routers/login");
const signupRouter = require("./routers/signup");
const messageRouter = require("./routers/messages");
const userInfoRouter = require("./routers/userInfo");
require('./database/connection');
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(signupRouter);
app.use(loginRouter);
app.use(messageRouter);
app.use(userInfoRouter);

app.get("/", (req, res) => {
    res.send("Hello World!");
});

// for admin

// 1. to get list of all users
app.get("/admin/users", async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).send(users);
    } catch (error) {
        res.status(400).send(undefined);
    }
});

// 2. to delete the user by id
app.delete("/admin/users", async (req, res) => {
    try {
        const _id = req.body._id;
        const result = await User.findByIdAndDelete(_id);
        res.status(200).send(result)
    } catch (error) {
        res.status(400).send(undefined)
    }
});

// 3. To get all the messages
app.get("/admin/messages", async (req, res) => {
    try {
        const messages = await Message.find();
        res.status(200).send(messages);
    } catch (error) {
        res.status(400).send(undefined)
    }
});

// 4. delete message by id
app.delete("/admin/messages", async (req, res) => {
    try {
        const _id = req.body._id;
        const messages = await Message.findByIdAndDelete(_id);
        res.status(200).send(messages);
    } catch (error) {
        res.status(400).send(undefined)
    }
});


app.listen(port, () => {
    console.log(`Listening to port ${port}...`);
});