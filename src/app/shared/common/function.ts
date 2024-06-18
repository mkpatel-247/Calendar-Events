/**
 * Return token from localStorage.
 * @returns token
 */
export function getToken() {
  const token = localStorage.getItem("authToken");
  return token ? JSON.parse(token) : null;
}

/**
 * Set authToken in localStorage.
 */
export function setToken(token: any) {
  localStorage.setItem("authToken", JSON.stringify(token));
}
