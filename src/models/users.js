const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    googleId: String,
    likes: [String],
    dislikes: [String],
    travelStyle: String,
    budget: Number,
    // Additional preferences can be added here
});

const Users = mongoose.model('Users', UserSchema);
module.exports = Users