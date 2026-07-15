import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { sendMessageToAI } from "../../api/aiApi";

export const sendAIMessage = createAsyncThunk(
  "ai/sendMessage",
  async (message, thunkAPI) => {
    try {
      return await sendMessageToAI(message);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const aiSlice = createSlice({
  name: "ai",

  initialState: {
    messages: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(sendAIMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(sendAIMessage.fulfilled, (state, action) => {
        state.loading = false;

        state.messages.push({
          role: "assistant",
          content: action.payload.response,
        });
      })

      .addCase(sendAIMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.detail || "Something went wrong.";
      });
  },
});

export default aiSlice.reducer;