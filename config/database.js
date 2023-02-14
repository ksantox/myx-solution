const mongoose = require("mongoose");

function connect() {
    // remove warning for upcoming feature
    mongoose.set('strictQuery', false);

    mongoose.connect(
        process.env.MONGO_URI,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        },
    );

    require("../models");
}

module.exports = {
    connect
}