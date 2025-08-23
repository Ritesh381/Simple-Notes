const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    username: { type: String, required: true, unique: true },
    pass: {type: String, required:true}
})

module.exports = mongoose.model("User",userSchema)