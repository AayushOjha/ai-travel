import axios from "axios";
import React, { createContext, useState, useContext, useEffect } from "react";
import { ApiBaseUrl, USER_TOKEN } from "./constants";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import Api from "./api";

// Create a Context for the auth information
const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
  
  const navigate = useNavigate();

  const [isLogedIn, setIsLogedIn] = useState()
  const [auth, setAuth] = useState({
    token: null,
    user: null,
  });

  useEffect(() => {
      const AuthToken = Cookies.get(USER_TOKEN)
      if (AuthToken) {
        Api.getProfile().then(res => {
          setAuth({token: AuthToken, user: res.user})
          setIsLogedIn(true)
        }).catch((e) => {
          console.error(e)
          setAuth({token: null, user: null})
          setIsLogedIn(false)
        })
      }else{
        setIsLogedIn(false)
      }
  }, [])

  // Function to log in the user
  const login = (token) => {
    axios
      .post(`${ApiBaseUrl}/auth/login-with-google`, { token })
      .then(({ data }) => {
        Cookies.set(USER_TOKEN, data.token, {
          expires: 1,
        });
        setAuth({ token: data.token, user: data.user });
        setIsLogedIn(true)
        navigate('/app')
      })
      .catch(() => {
        alert("Invalid Email");
        setIsLogedIn(false)
      });
  };

  // Function to log out the user
  const logout = () => {
    setAuth({ token: null, user: null });
    setIsLogedIn(false)
    navigate('/')
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout, isLogedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
