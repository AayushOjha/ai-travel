const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    googleId: String,
    travel_pace: {
        type: [String],
        enum: ['Relaxed', 'Moderate', 'Fast-paced'],
        default: ['Relaxed'],
        required: true,
      },
      travel_companions: {
        type: [String],
        enum: ['Solo', 'Family', 'Friends', 'Couple'],
        default: ['Solo'],
        required: true,
      },
      interests: {
        type: [String],
        enum: ['Sightseeing', 'Adventure sports', 'Cultural experiences', 'Relaxation', 'Shopping', 'Food & dining', 'Nightlife'],
        default: ['Sightseeing'],
        required: true,
      },
      budget: {
        type: [String],
        enum: ['Low', 'Medium', 'High'],
        default: ['Low'],
        required: true,
      },
      duration: {
        type: [String],
        enum: ['2-3 days', '5-6 days', '10-15 days'],
        default: ['5-6 days'],
        require: true
      }
});

const Users = mongoose.model('Users', UserSchema);
module.exports = Users