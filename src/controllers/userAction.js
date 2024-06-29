const UserPreferences = require("../models/preferances");

const saveUserPreferences = async (userId, preferences) => {
    try {
        const userPreferences = new UserPreferences({ userId, ...preferences });
        await userPreferences.save();
    } catch (error) {
        console.error('Error saving user preferences:', error);
        throw error;
    }
};

const getUserPreferences = async (userId) => {
    try {
        return await UserPreferences.findOne({ userId });
    } catch (error) {
        console.error('Error retrieving user preferences:', error);
        throw error;
    }
};

const generateItinerary = (travelSuggestions, userPreferences) => {
    // Logic to sort and organize travel suggestions into a daily itinerary
    // This can include sorting by user preference categories, proximity, or time slots
    // For simplicity, we assume the function returns a sorted array of suggestions
    return travelSuggestions.sort((a, b) => {
        // Custom sorting logic here
    });
};