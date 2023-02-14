const UserRepository = require("../repositories/UserRepository");

class UserService {
    //#region Singleton

    static instance = null;

    static get Instance() {
        if(!UserService.instance) {
            UserService.instance = new UserService();
        }

        return UserService.instance;
    }

    //#endregion

    USER_STARED_IMAGES_CACHE = {};

    async login(data) {
        const user = await UserRepository.login(data);
        return user;
    }

    async register(data) {
        const user = await UserRepository.register(data);
        return user;
    }

    async getUserStaredImages(userId) {
        const starredImages = await UserRepository.getUserStaredImages(userId);

        if(!this.USER_STARED_IMAGES_CACHE[userId]) {
            this.USER_STARED_IMAGES_CACHE[userId] = {};
        }

        for (let i = 0; i < starredImages.length; i++) {
            this.USER_STARED_IMAGES_CACHE[userId][starredImages[i]._id] = true;
        }

        return this.USER_STARED_IMAGES_CACHE[userId];
    }

    async starImage(imageId, userId) {
        if(!this.USER_STARED_IMAGES_CACHE[userId]) {
            this.USER_STARED_IMAGES_CACHE[userId] = {};
        }

        if(this.USER_STARED_IMAGES_CACHE[userId][imageId]) {
            return;
        }

        await UserRepository.starImage(imageId, userId);
        this.USER_STARED_IMAGES_CACHE[userId][imageId] = true;
    }

    async unstarImage(imageId, userId) {
        if(!this.USER_STARED_IMAGES_CACHE[userId]) {
            this.USER_STARED_IMAGES_CACHE[userId] = {};
        }

        if(!this.USER_STARED_IMAGES_CACHE[userId][imageId]) {
            return;
        }

        await UserRepository.unstarImage(imageId, userId);
        this.USER_STARED_IMAGES_CACHE[userId][imageId] = false;
    }

    async deleteImage(imageId) {
        const updatedVisitors = await UserRepository.deleteImage(imageId);

        for (let i = 0; i < updatedVisitors.length; i++) {
            if(!this.USER_STARED_IMAGES_CACHE[updatedVisitors[i]] || !this.USER_STARED_IMAGES_CACHE[updatedVisitors[i]][imageId]) {
                continue;
            }

            this.USER_STARED_IMAGES_CACHE[updatedVisitors[i]][imageId] = false;
        }
    }
}

module.exports = UserService.Instance;