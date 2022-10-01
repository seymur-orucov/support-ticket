import axios from "axios";

const API_URL = "/api/v1.0.0/";

// * REGISTER USER
const register = async (userData) => {
  const response = await axios.post(API_URL, userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// * LOGIN USER
const login = async (userData) => {
  const response = await axios.post(API_URL + "login", userData, {
    headers: {
      client: window.navigator.userAgentData.platform,
    },
  });

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// * LOGOUT USER
const logout = () => localStorage.removeItem("user");

const authService = { register, login, logout };

export default authService;
