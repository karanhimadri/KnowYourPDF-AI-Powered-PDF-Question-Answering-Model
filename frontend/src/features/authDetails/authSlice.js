import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const getAuthDetails = createAsyncThunk(
  "auth/getUserdetails",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_AUTH_URI}/get-user-details`,
        { withCredentials: true } // ✅ Required to send cookies
      );

      console.log(res);
      if (res.status === 200 && res.data?.success) {
        return { userDetails: res.data?.userDetails };
      } else {
        return rejectWithValue(
          res.data?.message || "Failed to fetch user data"
        );
      }
    } catch (error) {
      console.log(error.response?.data);
      return rejectWithValue(
        error.response?.data?.message || "No data received"
      );
    }
  }
);

const initialState = {
  userId: "",
  username: "",
  email: "",
  isUserAuthorised: false, // Fixed typo: was `isUSerAuthorised`
  isAccountVerified: false,
  error: "",
};

const authSlice = createSlice({
  name: "authhandler",
  initialState,
  reducers: {
    updateAuthDetails: (state, action) => {
      state.userId = action.payload.userId ?? state.userId;
      state.username = action.payload.username ?? state.username;
      state.email = action.payload.email ?? state.email;
      state.isAccountVerified =
        action.payload.isAccountVerified ?? state.isAccountVerified;
      state.isUserAuthorised =
        action.payload.isUserAuthorised ?? state.isUserAuthorised;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAuthDetails.pending, (state) => {
        state.error = "";
      })
      .addCase(getAuthDetails.fulfilled, (state, action) => {
        const { userDetails } = action.payload || {}; // Fix: Ensure `userDetails` is handled properly
        state.userId = userDetails?._id || "";
        state.username = userDetails?.name || "";
        state.email = userDetails?.email || "";
        state.isAccountVerified = userDetails?.isAccountVerified || false;
        state.isUserAuthorised = !!userDetails; // Ensures `true` if user exists
      })
      .addCase(getAuthDetails.rejected, (state, action) => {
        state.isUserAuthorised = false;
        state.error = action.payload || "An error occurred";
      });
  },
});

export const { updateAuthDetails } = authSlice.actions;
export { getAuthDetails }; // Export async thunk
export default authSlice.reducer;
