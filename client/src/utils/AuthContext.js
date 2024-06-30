import axios from "axios";
import React, { createContext, useState, useContext, useEffect } from "react";
import { AbiBase, USER_TOKEN } from "./constants";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

// Create a Context for the auth information
const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
  
  const navigate = useNavigate();

  const [auth, setAuth] = useState({
    token: null,
    user: null,
  });

  useEffect(() => {
      // fetch token from cookies
  }, [])

  // Function to log in the user
  const login = (token) => {
    axios
      .post(`${AbiBase}/auth/login-with-google`, { token })
      .then(({ data }) => {
        Cookies.set(USER_TOKEN, data.token, {
          expires: 1,
        });
        setAuth({ token: data.token, user: data.user });
        navigate('/app')
      })
      .catch(() => {
        alert("Invalid Email");
      });
  };

  // Function to log out the user
  const logout = () => {
    setAuth({ token: null, user: null });
    navigate('/')
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
