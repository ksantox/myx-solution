const GalleryService = require("../services/GalleryService");

class GalleryController {
    //#region Singleton

    static instance = null;

    static get Instance() {
        if(!GalleryController.instance) {
            GalleryController.instance = new GalleryController();
        }

        return GalleryController.instance;
    }

    //#endregion

    async getMoreImages(req, res) {
        try {
            const body = req.query;

            if(!body.skip) {
                body.skip = 0;
            }

            if(!body.limit) {
                body.limit = 20;
            }
            
            const images = await GalleryService.getMoreImages(body);

            res.status(200).send({ images }).end();
        } catch (error) {
            res.status(400).send({ error: error.message }).end();
        }
    }
}

module.exports = GalleryController.Instance;