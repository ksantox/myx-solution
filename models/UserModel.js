const mongoose = require("mongoose");
const { hashPassword } = require("../utils/modelHelpers");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    staredImages: [{ type: Schema.Types.ObjectId, ref: "images" }]
}, { timestamps: true });

// On Save hook
// encrypt password
UserSchema.pre("save", function(next) {
    const user = this;

    if(user.isModified("password")) {
        try {
            const hashedPassword = hashPassword(user.password)
            user.password = hashedPassword;
            next();
        } catch (error) {
            next(error);
        }
    } else {
        next()   
    }
});

const UserModel = mongoose.model("users", UserSchema);
module.exports = UserModel;