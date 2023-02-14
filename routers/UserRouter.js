const fs = require("fs");
const multer = require("multer");
const { Router } = require("express");
const requireAuth = require("../middlewares/requireAuth");
const { UserController: controller } = require("../controllers");

const router = new Router();

const storage = multer.diskStorage({
    destination: function(req, _, callback) {
        const targetPath = `./uploads/${req.user}/`;

        if(!fs.existsSync(targetPath)) {
            fs.mkdirSync(targetPath);
        }

        callback(null, targetPath);
    },
    filename: function(_, file, callback) {
        const fileName = `${Date.now()}_${file.originalname}`;

        callback(null, fileName);
    }
});

const multerMiddleware = multer({ storage });

router.post("/auth/login", (req, res) => controller.login(req, res));
router.post("/auth/register", (req, res) => controller.register(req, res));
router.put("/user/starImage", requireAuth, (req, res) => controller.starImage(req, res));
router.put("/user/unstarImage", requireAuth, (req, res) => controller.unstarImage(req, res));
router.delete("/user/deleteImage", requireAuth, (req, res) => controller.deleteImage(req, res));
router.post("/user/uploadImage", requireAuth, multerMiddleware.single("userImage"), (req, res) => controller.uploadImage(req, res));

module.exports = router;