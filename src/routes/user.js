require("dotenv").config();
const OpenAI = require("openai");
const express = require("express");
const Users = require("../models/users");
const router = express.Router();

router.post("/generate-itinerary", async (req, res) => {
  try {
    const openai = new OpenAI({ apiKey: process.env.OPEN_AI_API_KEY });

    const { travel_pace, travel_companions, interests, budget, duration } =
      req.user;

    const destination = req.body.destination;

    if (!destination) return res.status(401).send("destination missing");

    const prompt = `Create a travel plan for ${destination}. The user prefers a ${budget} budget. They are interested in ${interests}. They are traveling with ${travel_companions}. They like a ${travel_pace} travel pace and plan to stay for ${duration}. Please provide a detailed itinerary with activities, accommodations, and dining recommendations.`;

    const chatCompletion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-3.5-turbo",
    });

    const plan = chatCompletion.choices[0].message.content;
    res.send(plan);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while generating the itinerary");
  }
});

router.post("/preferences", async (req, res) => {
  try {
    const { travel_pace, travel_companions, interests, budget, duration } = req.body.data;

    try {

      // Save the updated user
      const x = await Users.updateOne(
        { _id: req.user._id },
        {
          $set: {
            travel_pace,
            travel_companions,
            interests,
            budget,
            duration,
          },
        }
      );

      res.status(200).json({ message: "Preferences updated successfully" });
    } catch (error) {
      console.error("Error updating preferences:", error);
      res.status(500).json({ message: "Server error" });
    }
  } catch (error) {
    res.status(500).send("An error occurred while generating the itinerary");
  }
});

router.get("/get-profile", async (req, res) => {
  try {
    res.send({ user: req.user });
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while generating the itinerary");
  }
});

module.exports = router;
