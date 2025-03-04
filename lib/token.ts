import Cookies from "js-cookie";

export const TOKEN_KEY = "token";

function saveToken(token: string) {
  Cookies.set(TOKEN_KEY, token);
}

function getToken() {
  return Cookies.get(TOKEN_KEY);
}

function removeToken() {
  Cookies.remove(TOKEN_KEY);
}

export { saveToken, getToken, removeToken };