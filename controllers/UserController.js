const jwt = require("jsonwebtoken");
const UserService = require("../services/UserService");
const GalleryService = require("../services/GalleryService");

class UserController {
    //#region Singleton

    static instance = null;

    static get Instance() {
        if(!UserController.instance) {
            UserController.instance = new UserController();
        }

        return UserController.instance;
    }

    //#endregion

    async login(req, res) {
        try {
            const loginData = req.body;

            if(!loginData.password || !loginData.email) {
                throw new Error("Invalid credentials provided.");
            }

            const user = await UserService.login(loginData);

            if(user.message) {
                res.send(user);
                return
            };

            const token = jwt.sign({ user: user._id }, process.env.SECRET_KEY);
            const userData = { _id: user._id, staredImages: user.staredImages };

            res.send({ token, user: userData });
        } catch (error) {
            res.send({ error: error.message });
        }
    }

    async register(req, res) {
        try {
            const registerData = req.body;

            if(!registerData.email || !registerData.password) {
                throw new Error("Invalid credentials provided.");
            }

            const user = await UserService.register(registerData);

            const token = jwt.sign({ user: user._id }, process.env.SECRET_KEY);
            const userData = { _id: user._id, staredImages: user.staredImages };

            res.send({ token, user: userData });
        } catch (error) {
            res.send({ error: error.message });
        }
    }

    async starImage(req, res) {
        try {
            const body = req.body;
            const userId = req.user;

            if(!body._id) {
                throw new Error(`Missing image id.`);
            }

            await UserService.starImage(body._id, userId);

            res.status(200).end();
        } catch(error) {
            res.status(400).send({ error: error.message }).end();
        }
    }

    async unstarImage(req, res) {
        try {
            const body = req.body;
            const userId = req.user;

            if(!body._id) {
                throw new Error(`Missing image id.`);
            }

            await UserService.unstarImage(body._id, userId);

            res.status(200).end();
        } catch(error) {
            res.status(400).send({ error: error.message }).end();
        }
    }

    async uploadImage(req, res) {
        try {
            const file = req.file;

            if(!file) {
                throw new Error(`Invalid request.`);
            }

            const image = await GalleryService.uploadImage(file, req.user);

            res.status(200).send({ image }).end();
        } catch(error) {
            res.status(400).send({ error: error.message }).end();
        }
    }

    async deleteImage(req, res) {
        try {
            const body = req.body;
            const imageId = body._id;

            if(!imageId) {
                throw new Error(`Missing image id.`);
            }

            await GalleryService.deleteImage(imageId);
            await UserService.deleteImage(imageId);

            res.status(200).end();
        } catch(error) {
            res.status(400).send({ error: error.message }).end();
        }
    }
}

module.exports = UserController.Instance;