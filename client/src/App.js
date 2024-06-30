import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./utils/AuthContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { LoginPage } from "./pages/LoginPage";
import { HomePage } from "./pages/HomePage";

function App() {
  return (
    <Router>
      <AuthProvider>
        <GoogleOAuthProvider clientId={process.env.REACT_APP_OAUTH_CLIENT}>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/app" element={<HomePage />} />
            {/* <Route path="/profile" element={<UserProfile />} /> */}
          </Routes>
        </GoogleOAuthProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
