import express from "express";
import {
  login,
  logout,
  register,
  resetPassword,
  sendResetOtp,
  sendVerifyOtp,
  verifyEmail,
  verifyResetPasswordOTP,
  getUserAuthDetails
} from "../controllers/authController.js";
import userAuth from "../middleware/userAuth.js";

const authRoutes = express.Router();

authRoutes.post("/register", register);
authRoutes.post("/login", login);
authRoutes.post("/logout", logout);
authRoutes.post("/send-verify-otp", userAuth, sendVerifyOtp);
authRoutes.post("/verify-account", userAuth, verifyEmail);
authRoutes.post("/send-reset-otp", sendResetOtp);
authRoutes.post("/verify-password-otp",verifyResetPasswordOTP);
authRoutes.post("/reset-password", resetPassword);
authRoutes.get("/get-user-details",userAuth,getUserAuthDetails)

export default authRoutes;
