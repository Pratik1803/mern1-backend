const mongoose = require("mongoose");

const DB = "mongodb+srv://prtk:Domin%40r400@cluster0.hmz55.mongodb.net/mern-1?retryWrites=true&w=majority";
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