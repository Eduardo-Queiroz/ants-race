import axios from "axios";

export const api = axios.create({
  baseURL: "https://sg-ants-test.herokuapp.com",
});
