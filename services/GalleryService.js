const gm = require("gm");
const GalleryRepository = require("../repositories/GalleryRepository");

class GalleryService {
    //#region Singleton

    static instance = null;

    static get Instance() {
        if(!GalleryService.instance) {
            GalleryService.instance = new GalleryService();
        }

        return GalleryService.instance;
    }

    //#endregion

    async getMoreImages(data) {
        const images = await GalleryRepository.getMoreImages(data);
        return images;
    }

    async uploadImage(imageData, user) {
        imageData.thumbPath = await this.generateThumbnail(imageData);
        const image = await GalleryRepository.uploadImage(imageData, user);

        return image;
    }

    async generateThumbnail(imageData) {
        return new Promise((res, rej) => {
            if(process.env.GENERATE_THUMBNAILS !== "true") {
                res(imageData.path);
                return;
            }

            const thumbPath = `${imageData.destination}thumb_${imageData.filename}`;
            
            gm(imageData.path)
                .resize("250", "250")
                .gravity("center")
                .crop("250", "250")
                .write(thumbPath, error => {
                    if(error) {
                        rej(error);
                        return;
                    }

                    res(thumbPath);
                });
        });
    }

    async deleteImage(_id) {
        await GalleryRepository.deleteImage(_id);
    }
}

module.exports = GalleryService.Instance;