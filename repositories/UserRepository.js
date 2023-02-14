const UserModel = require("../models/UserModel");
const { comparePassword } = require("../utils/modelHelpers");

class UserRepository {
    //#region Singleton

    static instance = null;

    static get Instance() {
        if(!UserRepository.instance) {
            UserRepository.instance = new UserRepository();
        }

        return UserRepository.instance;
    }

    //#endregion

    async login(loginData) {
        const { email, password } = loginData;

        const user = await UserModel.findOne({ email }).lean();

        if (!user) {
            throw new Error("Invalid credentials");
        }

        const doesPasswordMatch = comparePassword(password, user.password);

        if(!doesPasswordMatch) {
            throw new Error("Invalid credentials");
        }
        
        return user;
    }

    async register(registerData) {
        const { email, password } = registerData;
        const foundUser = await UserModel.findOne({ email: email });

        if (foundUser) {
            throw new Error("Email already in use.");
        }

        const newUser = await UserModel.create({ email, password });
        return newUser;
    };

    async getUserStaredImages(id) {
        const viewerData = await UserModel.findById(id);

        if(!viewerData) {
            return [];
        }

        return viewerData.staredImages;
    }

    async starImage(imageId, id) {
        await UserModel.findByIdAndUpdate(id, { $push: { staredImages: imageId } });
    }

    async unstarImage(imageId, id) {
        await UserModel.findByIdAndUpdate(id, { $pull: { staredImages: imageId } });
    }

    async deleteImage(imageId) {
        const targetVisitors = await UserModel.find({ staredImages: imageId });
        const updatedVisitorsIds = [];

        for (let i = 0; i < targetVisitors.length; i++) {
            updatedVisitorsIds.push(targetVisitors[i]._id);
        }

        await UserModel.updateMany({ staredImages: imageId }, { $pull: { staredImages: imageId } });
        
        return updatedVisitorsIds;
    }
}

module.exports = UserRepository.Instance;