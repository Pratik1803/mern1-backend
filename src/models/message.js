const mongoose = require("mongoose");
const validator = require("validator");

const msgSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error;
            };
        },
    },
    contact: {
        type: Number,
        maxlength: 13,
        minlength: 10
    },
    message: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
    }
});

const Message = new mongoose.model("message", msgSchema);
module.exports = Message;
