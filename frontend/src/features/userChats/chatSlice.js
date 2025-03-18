import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async Thunk to handle input message and context
const handleInputMessageAndContext = createAsyncThunk(
  "chats/send",
  async ({ inputMessage, context }, { rejectWithValue }) => {
    try {
      // Properly format the query string with encoded parameters
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URI}/api/query?q=${encodeURIComponent(
          inputMessage
        )}&context=${encodeURIComponent(context)}`
      );
      return { res: response.data?.message, inputMessage };
    } catch (error) {
      return rejectWithValue(error.response?.data || "No data received");
    }
  }
);

// Sample message for initial state
const samplechatMessage = {
  id: 1,
  input: "Tell me about Indian Constitution",
  output:
    "This is a question paper for a college course on the Constitution of India, specifically for students in the CSE/IT branch of Techno Engineering College Banipur in their 5th semester. The paper consists of four questions, each with multiple parts, covering various topics related to the Indian Constitution.",
};

// Initial state for the slice
const initialState = {
  messages: [],
  loadingState: false,
  error: null,
};

export const chatSlice = createSlice({
  name: "chatsHandler",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(handleInputMessageAndContext.pending, (state) => {
        state.loadingState = true;
        state.error = null; // Clear previous errors
      })
      .addCase(handleInputMessageAndContext.fulfilled, (state, action) => {
        state.loadingState = false;
        const { res, inputMessage } = action.payload;
        state.messages.push({
          id: state.messages.length + 1,
          input: inputMessage,
          output: res,
        });
      })
      .addCase(handleInputMessageAndContext.rejected, (state, action) => {
        state.loadingState = false; // Reset loading
        state.error = action.payload;
      });
  },
});

export { handleInputMessageAndContext };
export default chatSlice.reducer;
