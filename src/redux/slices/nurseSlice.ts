import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Nurse, NurseState } from "../../domain/Nurse";

const NurseSlice = createSlice({
  name: "nurseSlice",
  initialState: {
    data: [] as Nurse[],
  },
  reducers: {
    setNurseData: (state: NurseState, action: PayloadAction<Nurse[]>) => {
      state.data = action.payload;
    },
  },
});

export const { setNurseData } = NurseSlice.actions;
export default NurseSlice.reducer;
