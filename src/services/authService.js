import jwtDecode from "jwt-decode";
import http from "./httpService";

const apiEndpoint = "/auth";
const tokenkey = "token";

http.setJWT(getJWT());

export async function login(email, password) {
  const { data: jwt } = await http.post(apiEndpoint, { email, password });
  localStorage.setItem(tokenkey, jwt);
}

export function loginWithJwt(jwt) {
  localStorage.setItem(tokenkey, jwt);
}

export function logout() {
  localStorage.removeItem(tokenkey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenkey);
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

export function getJWT() {
  return localStorage.getItem(tokenkey);
}

export default {
  login,
  loginWithJwt,
  logout,
  getCurrentUser,
  getJWT,
};
