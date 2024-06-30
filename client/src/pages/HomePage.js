import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";

const HomePage = () => {

  const navigate = useNavigate();
  const { isLogedIn } = useAuth()

  if (isLogedIn === undefined) {
    return <h1>Loading...</h1>
  }

  if (isLogedIn === false) {
    navigate('/')
  }

  return <div className="home-page">Home Page</div>;
};

export { HomePage };
