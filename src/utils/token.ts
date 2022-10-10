import axios from "axios";

import {
  setDataToLocalStorage,
  getUserFromLocalStorage,
  getTokenFromLocalStorage,
} from "./handleToken";

export const getToken = async () => {
  const { refreshToken } = getTokenFromLocalStorage();

  const userId = getUserFromLocalStorage();

  try {
    const res = await axios.post("/generate-token", { refreshToken, userId });
    if (res.data) {
      const data = res.data.data;
      setDataToLocalStorage(data.access, data.refresh, "true", data.user_id);
    }
  } catch (error) {
    console.log(error);
  }
};
