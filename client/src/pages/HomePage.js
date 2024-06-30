import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";
import TextField from "@mui/material/TextField";
import EditIcon from "@mui/icons-material/Edit";
import { Button } from "@mui/material";
import { useState } from "react";

const HomePage = () => {
  const navigate = useNavigate();
  const { isLogedIn } = useAuth();

  const [itinerary, setItinerary] = useState();
  const [loading, setLoading] = useState(false);
  const [place, setPlace] = useState();

  const generateItinerary = async () => {
    if (place) { 
      setLoading(true)
      console.log("generating for", place);
      setItinerary("jao or gumo");
      setLoading(false)
    }else{
      alert('please enter place name')
    }
  };

  if (isLogedIn === undefined) {
    return <h1>Loading...</h1>;
  }

  if (isLogedIn === false) {
    navigate("/");
  }

  return (
    <div className="home-page app-container">
      <div className="header">
        <div>
          <h1>Travel AI</h1>
          <p>generated best Itinerary</p>
        </div>
        <div
          className="nav-item"
          onClick={() => {
            navigate("/profile");
          }}
        >
          <p className="user">Preferences</p>
          <EditIcon />
        </div>
      </div>
      <div className="search-container">
        <TextField
          id="outlined-basic"
          label="Enter place name"
          variant="outlined"
          fullWidth
          value={place}
          onChange={({target}) => {
            setPlace(target.value)
          }}
        />
        <Button variant="outlined" onClick={generateItinerary}>
          Generate
        </Button>
      </div>

      <div className="itinerary-box">
        {loading ? <p>Generating for you</p> : <></>}
        {itinerary ? <p>{itinerary}</p> : <></>}
      </div>
    </div>
  );
};

export { HomePage };
