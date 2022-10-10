import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
  name: "nurseSlice",
  initialState: {
    data: {
      isLoggedin: false,
      userId: null,
    },
  },
  reducers: {
    setUserData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setUserData } = UserSlice.actions;
export default UserSlice.reducer;
