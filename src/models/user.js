const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: [true, "Username is already taken!"],
        required: true,
        minlength: 4,
        maxlength: 10
    },
    email: {
        type: String,
        validate(userEmail) {
            if (!validator.isEmail(userEmail)) {
                throw new Error
            };
        },
        required: true,
        unique: [true, "Email already exixts!"]
    },
    contact: {
        type: Number,
        maxlength: 10,
        minlength: 10
    },
    profession: {
        type: String,
    },
    password: {
        type: String,
        required: true,
        minlength: 4
    }
});

userSchema.pre("save", async function (next) {
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

const User = new mongoose.model("User", userSchema);
module.exports = User;
