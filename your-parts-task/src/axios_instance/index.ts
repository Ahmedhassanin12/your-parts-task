import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

export default api;


export const userApi = axios.create({
  baseURL: "https://reqres.in/api/",
});

