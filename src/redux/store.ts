import { configureStore } from "@reduxjs/toolkit";
import nurseReducer from "./slices/nurseSlice";
import userReducer from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    nurseReducer,
    userReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
