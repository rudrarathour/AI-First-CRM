import { configureStore } from "@reduxjs/toolkit";
import aiReducer from "../features/ai/aiSlice";

export const store = configureStore({
  reducer: {
    ai: aiReducer,
  },
});