import "./App.css";
import axios from "axios";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { AbiBase, USER_TOKEN } from "./constants";
import Cookies from "js-cookie";

function App() {
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_OAUTH_CLIENT}>
      <div className="App">
        <h1>Hello</h1>
        <GoogleLogin
          onSuccess={(respose) => {
            const token = respose.credential;
            if (token) {
              axios
                .post(`${AbiBase}/auth/login-with-google`, { token })
                .then(({ data }) => {
                  Cookies.set(USER_TOKEN, data.token, {
                    expires: 1,
                  });
                })
                .catch(() => {
                  alert("Invalid Email");
                });
            } else {
              console.error("empty token");
            }
          }}
          onError={() => {
            console.log("Login Failed");
          }}
        />
        ;
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;
