export const getAuthToken = () => localStorage.getItem("goRestToken");
export const setAuthToken = (token: string) => localStorage.setItem("goRestToken", token);
export const removeAuthToken = () => localStorage.removeItem("goRestToken"); 