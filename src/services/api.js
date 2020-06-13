import axios from "axios";

const api = axios.create({
  baseURL: "https://apibips.herokuapp.com/",
  headers: {
    Token: sessionStorage.token,
    "Access-Control-Allow-Origin": "*"
  }
});

export default api;
