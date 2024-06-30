import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";
import { Button, ButtonGroup, Typography, Grid } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import Api from "../utils/api";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { isLogedIn, auth } = useAuth();

  const [travelPace, setTravelPace] = useState(auth?.user?.travel_pace || []);
  const [travelCompanions, setTravelCompanions] = useState(
    auth?.user?.travel_companions || []
  );
  const [interests, setInterests] = useState(auth?.user?.interests || []);
  const [budget, setBudget] = useState(auth?.user?.budget || []);
  const [duration, setDuration] = useState(auth?.user?.duration || []);

  useEffect(() => {
    setTravelCompanions(auth?.user?.travel_companions || []);
    setTravelPace(auth?.user?.travel_pace || []);
    setInterests(auth?.user?.interests || []);
    setBudget(auth?.user?.budget || []);
    setDuration(auth?.user?.duration || []);
  }, [auth.user]);

  if (isLogedIn === undefined) {
    return <h1>Loading...</h1>;
  }

  if (isLogedIn === false) {
    navigate("/");
  }

  const handleSave = async () => {
    try {
      const response = await Api.updatePreferances({
        travel_pace: travelPace,
        travel_companions: travelCompanions,
        interests: interests,
        budget: budget,
        duration: duration,
      });
      alert("Preferences updated successfully");
    } catch (error) {
      alert("Error updating preferences");
      console.error("Error updating preferences:", error);
    }
  };

  const toggleSelection = (setter, value, options) => {
    setter((prev) => {
      const newSelection = prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value];
      return newSelection.filter((item) => options.includes(item));
    });
  };

  const travelPaceOptions = ["Relaxed", "Moderate", "Fast-paced"];
  const travelCompanionsOptions = ["Solo", "Family", "Friends", "Couple"];
  const interestsOptions = [
    "Sightseeing",
    "Adventure sports",
    "Cultural experiences",
    "Relaxation",
    "Shopping",
    "Food & dining",
    "Nightlife",
  ];
  const budgetOptions = ["Low", "Medium", "High"];
  const durationOptions = ["2-3 days", "5-6 days", "10-15 days"];

  return (
    <div className="app-container">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h3">Travel Preferences</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle1">Travel Pace</Typography>
          <ButtonGroup variant="outlined">
            {travelPaceOptions.map((option) => (
              <Button
                key={option}
                onClick={() =>
                  toggleSelection(setTravelPace, option, travelPaceOptions)
                }
                variant={travelPace.includes(option) ? "contained" : "outlined"}
              >
                {option}
              </Button>
            ))}
          </ButtonGroup>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle1">Travel Companions</Typography>
          <ButtonGroup variant="outlined">
            {travelCompanionsOptions.map((option) => (
              <Button
                key={option}
                onClick={() =>
                  toggleSelection(
                    setTravelCompanions,
                    option,
                    travelCompanionsOptions
                  )
                }
                variant={
                  travelCompanions.includes(option) ? "contained" : "outlined"
                }
              >
                {option}
              </Button>
            ))}
          </ButtonGroup>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle1">Interests</Typography>
          <ButtonGroup variant="outlined">
            {interestsOptions.map((option) => (
              <Button
                key={option}
                onClick={() =>
                  toggleSelection(setInterests, option, interestsOptions)
                }
                variant={interests.includes(option) ? "contained" : "outlined"}
              >
                {option}
              </Button>
            ))}
          </ButtonGroup>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle1">Budget</Typography>
          <ButtonGroup variant="outlined">
            {budgetOptions.map((option) => (
              <Button
                key={option}
                onClick={() =>
                  toggleSelection(setBudget, option, budgetOptions)
                }
                variant={budget.includes(option) ? "contained" : "outlined"}
              >
                {option}
              </Button>
            ))}
          </ButtonGroup>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle1">Duration</Typography>
          <ButtonGroup variant="outlined">
            {durationOptions.map((option) => (
              <Button
                key={option}
                onClick={() =>
                  toggleSelection(setDuration, option, durationOptions)
                }
                variant={duration.includes(option) ? "contained" : "outlined"}
              >
                {option}
              </Button>
            ))}
          </ButtonGroup>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save Preferences
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export { ProfilePage };
