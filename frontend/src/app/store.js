import { configureStore } from "@reduxjs/toolkit";
import fileReducer from "../features/files/fileSlice";
import chatReducer from "../features/userChats/chatSlice";
import authReducer from "../features/authDetails/authSlice";

export const store = configureStore({
  reducer: {
    fileHandler: fileReducer,
    chatsHandler: chatReducer,
    authHandler: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["fileHandler/handleFileDisribution"],
        ignoredPaths: ["fileHandler.file"], // Ignore specific paths if needed
      },
    }),
});
