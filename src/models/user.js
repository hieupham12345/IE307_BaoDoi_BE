const mongoose = require('mongoose')
const userSchema = new mongoose.Schema(
    {
        username: {type: String, required: true},
        password: {type: String, required: true},
        email: {type: String, unique: false},
        access_token: {type: String, require: true},
        refesh_token: {type: String, require: true},
        recently_read_articles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Article' }],
        liked_articles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Article' }]
    },
    {
        timestamps: true
    }
)
const user = mongoose.model("user", userSchema);
module.exports = user;