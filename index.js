require("dotenv").config();
const path = require("path");
const express = require("express");
const { json } = require("body-parser");
const { database } = require("./config");

database.connect();
const app = express();

app.use(json({ limit: "50mb" }));
app.use("/uploads", express.static("uploads"));

// Load Routes
require("./routers")(app);

// In production load the react app build
if (process.env.NODE_ENV === "production") {
    // Serve production assets
    // like main.js, css files etc.
    app.use(express.static(path.join(__dirname, "/client/build")));

    // Express will server the index.html file
    // if it doesn't recognize the route
    app.get("*", (_, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}

const PORT = process.env.SERVER_PORT || 7000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}.`);
    console.log(`Server is running on environment: ${process.env.NODE_ENV}.`);
});