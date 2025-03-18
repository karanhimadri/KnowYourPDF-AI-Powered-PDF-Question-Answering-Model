import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const uploadFile = createAsyncThunk(
  "file/upload",
  async (file, { rejectWithValue }) => {
    const fileData = new FormData();
    fileData.append("file", file);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URI}/upload/file`,
        fileData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data.message || "File uploaded successfully !!";
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong");
    }
  }
);

const initialState = {
  response: null,
  status: "idle",
  error: null,
  file: null,
};

const fileSlice = createSlice({
  name: "fileHandler",
  initialState,
  reducers: {
    resetState: (state) => {
      state.response = null;
      state.status = "idle";
      state.error = null;
    },
    handleFileDisribution: (state, action) => {
      state.file = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadFile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(uploadFile.fulfilled, (state, action) => {
        state.status = "success";
        state.response = action.payload;
      })
      .addCase(uploadFile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export { uploadFile };
export const { resetState, handleFileDisribution } = fileSlice.actions;
export default fileSlice.reducer;
