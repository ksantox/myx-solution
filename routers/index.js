const UserRouter = require("./UserRouter");
const GalleryRouter = require("./GalleryRouter");

module.exports = app => {
    app.use(UserRouter);
    app.use(GalleryRouter);
}