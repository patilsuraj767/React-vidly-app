import axios from "axios";
import logger from "./logService";
import { toast } from "react-toastify";

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.response.use(null, (error) => {
  const exptectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!exptectedError) {
    logger(error);
    toast.error("An unexpected error occurred.");
  }
  return Promise.reject(error);
});

function setJWT(jwt) {
  axios.defaults.headers.common["x-auth-token"] = jwt;
}

export default {
  get: axios.get,
  put: axios.put,
  delete: axios.delete,
  post: axios.post,
  setJWT,
};
