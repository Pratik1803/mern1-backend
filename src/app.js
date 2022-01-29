const express = require("express");
const app = express();
const path = require("path");
const bcrypt = require("bcryptjs");
const User = require(path.join(__dirname, "./models/user"));
const Message = require(path.join(__dirname, "./models/message"));
const cors = require("cors");
require('./database/connection');
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

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

//////////////////////////////////////////////////////////////////////////

// Check the login of user
app.get("/login", async (req, res) => {
    const user = await User.find({ username: req.body.username });
    const result = await bcrypt.compare(req.body.password, user[0].password);
    if (user[0] && result) {
        res.status(200).send(true);
    } else {
        res.status(400).send(false);
    };
});

// Check the login of admin
app.get("/admin/login", async (req, res) => {
    const admin = await Admin.find({ username: req.body.username });
    const result = await bcrypt.compare(req.body.password, admin[0].password);
    if (admin[0] && result) {
        res.status(200).send(true);
    } else {
        res.status(400).send(false);
    };
});


// Send Message
app.post("/contact", async (req, res) => {
    try {
        const newMessage = new Message(req.body);
        const result = await newMessage.save();
        res.status(201).send(result)
    } catch (error) {
        console.log(error)
        res.status(400).send(undefined)
    }
});


// Get the information of all users
app.get("/signup", async (req, res) => {
    try {
        const users = await User.find();
        res.send("Sign up page")
    } catch (error) {
        console.log(error)
        res.status(400).send(undefined);
    }
});

// Create a new user
app.post('/signup', async (req, res) => {
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
app.post('/admin/signup', async (req, res) => {
    try {
        const newAdmin = new Admin(req.body);
        const result = await newAdmin.save();
        res.status(201).send(result);
    } catch (error) {
        console.log(error)
        res.status(400).send(undefined);
    }
});


// To get user by id
app.get("/user", async (req, res) => {
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
app.put("/user", async (req, res) => {
    try {
        const _id = req.body._id;
        const loggedInUser = await User.findByIdAndUpdate(_id, req.body, { new: true });
        res.status(202).send(loggedInUser);
    } catch (error) {
        console.error(error)
        res.status(400).send(undefined);
    };
});


app.listen(port, () => {
    console.log(`Listening to port ${port}...`);
});