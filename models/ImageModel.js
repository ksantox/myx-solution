const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Image = new Schema({
    name: { type: String, require: true },
    type: { type: String, require: true },
    path: { type: String, require: true },
    thumbPath: { type: String, require: true },
    dateOfDeletion: { type: Date },
    user: { type: Schema.Types.ObjectId, ref: "users" },
    isDeleted: { type: Boolean, require: true, default: false }
}, { timestamps: true });

const ImageModel = mongoose.model("images", Image);
module.exports = ImageModel;