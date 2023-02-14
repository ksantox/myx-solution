const ImageModel = require("../models/ImageModel");

class GalleryRepository {
    //#region Singleton

    static instance = null;

    static get Instance() {
        if(!GalleryRepository.instance) {
            GalleryRepository.instance = new GalleryRepository();
        }

        return GalleryRepository.instance;
    }

    //#endregion

    async getMoreImages(data) {
        const images = await ImageModel.find({ isDeleted: false }).sort({ createdAt: -1 }).select("path name user thumbPath").skip(data.skip).limit(data.limit);
        return images;
    }

    async uploadImage(data, user) {
        const type = data.mimetype.split("/")[1];
        const uploadedImage = await ImageModel.create({ name: data.filename, type, path: data.path, user, thumbPath: data.thumbPath });

        return uploadedImage;
    }

    async deleteImage(_id) {
        await ImageModel.findByIdAndUpdate(_id, { isDeleted: true, dateOfDeletion: Date.now() });
    }
}

module.exports = GalleryRepository.Instance;