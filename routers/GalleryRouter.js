const { Router } = require("express");
const { GalleryController: controller } = require("../controllers");

const router = new Router();

router.get("/gallery/getFullImage", (req, res) => controller.getFullImage(req, res));
router.get("/gallery/getMoreImages", (req, res) => controller.getMoreImages(req, res));

module.exports = router;