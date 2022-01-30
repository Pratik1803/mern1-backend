const mongoose = require("mongoose");

const DB = process.env.DB;
// , {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useUnifiedTopology: true,
//     useFindAndModify: false
// }

mongoose.connect(DB)
    .then(() => console.log("Connection Successful!"))
    .catch((err) => {
        console.log(err)
    });