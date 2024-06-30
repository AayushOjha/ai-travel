import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./utils/AuthContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { LoginPage } from "./pages/LoginPage";
import { HomePage } from "./pages/HomePage";
import { ProfilePage } from "./pages/PreferancePage";
import { createTheme, ThemeProvider } from "@mui/material";

function App() {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  return (
    <Router>
      <AuthProvider>
        <GoogleOAuthProvider clientId={process.env.REACT_APP_OAUTH_CLIENT}>
          <ThemeProvider theme={darkTheme}>
            <Routes>
              <Route path="/app" element={<HomePage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="*" element={<LoginPage />} />
            </Routes>
          </ThemeProvider>
        </GoogleOAuthProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
