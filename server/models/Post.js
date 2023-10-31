const mongoose = require("mongoose");
const schema = mongoose.Schema;
const PostSchema = new schema ({
    title: {
        type: String,
        require: true,
        unique: true
    },
    body: {
        type: String,
        require: true
    },
    author : {
        type: String,
    },
    state: {
        type: String,
        enum: ["draft", "published"],
        require: true,
        default: "draft"
    },
    createAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    user_id: {type: String, ref: "Users"}
})

module.exports = mongoose.model('Post', PostSchema)