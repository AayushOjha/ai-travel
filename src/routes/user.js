const express = require('express');
const router = express.Router();

router.post('/generate-itinerary', async (req, res) => {
    try {
        const { destination, userId } = req.body;
        const userPreferences = await getUserPreferences(userId);
        const travelSuggestions = await getTravelSuggestions(destination, userPreferences);
        const itinerary = generateItinerary(travelSuggestions, userPreferences);
        res.json(itinerary);
    } catch (error) {
        res.status(500).send('An error occurred while generating the itinerary');
    }
});

router.post('/preferences', async (req, res) => {
    try {
        const { destination, userId } = req.body;
        const userPreferences = await getUserPreferences(userId);
        const travelSuggestions = await getTravelSuggestions(destination, userPreferences);
        const itinerary = generateItinerary(travelSuggestions, userPreferences);
        res.json(itinerary);
    } catch (error) {
        res.status(500).send('An error occurred while generating the itinerary');
    }
});

router.get('/preferences', async (req, res) => {
    try {
        const { userId } = req.query;
        const userPreferences = await getUserPreferences(userId);
        const travelSuggestions = await getTravelSuggestions(destination, userPreferences);
        const itinerary = generateItinerary(travelSuggestions, userPreferences);
        res.json(itinerary);
    } catch (error) {
        res.status(500).send('An error occurred while generating the itinerary');
    }
});


module.exports = router;