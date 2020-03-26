export function getAuthToken() {
  return JSON.parse(localStorage.getItem("token"));
}

export function setAuthToken(token) {
  localStorage.setItem("token", JSON.stringify(token));
}

export function removeAuthToken() {
  localStorage.removeItem("token");
}
