// Set authenticated user's details in localstorage
export const setDataToLocalStorage = (
  accesstoken: string,
  refreshtoken: string,
  isAuthenticated: string,
  userId: string
) => {
  localStorage.setItem("isAuthenticated", isAuthenticated);
  localStorage.setItem("accessToken", accesstoken);
  localStorage.setItem("refreshToken", refreshtoken);
  localStorage.setItem("userId", userId);
};

// Fetch user tokens from localStorage
export const getTokenFromLocalStorage = () => {
  return {
    accessToken: localStorage.getItem("accessToken"),
    refreshToken: localStorage.getItem("refreshToken"),
  };
};

// Fetch userId of the loggedin user from localstorage
export const getUserFromLocalStorage = () => {
  return localStorage.getItem("userId");
};

// Check if user is authenticated
export const getUserAuthenticated = () => {
  if (localStorage.getItem("isAuthenticated") !== null) {
    const auth = JSON.parse(localStorage.getItem("isAuthenticated") as any);
    return auth;
  }
};

// Remove item data from localStorage
export const removeDataFromLocalStorage = () => {
  localStorage.removeItem("isAuthenticated");
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("userId");
};
