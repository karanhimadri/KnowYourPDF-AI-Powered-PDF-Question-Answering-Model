import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import transporter from "../config/nodemailer.js";

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const normalizedEmail = email.toLowerCase();
  if (!name || !normalizedEmail || !password) {
    return res.status(400).json({ success: false, message: "Missing Details" });
  }
  try {
    const isUserExists = await userModel.findOne({ email: normalizedEmail });
    if (isUserExists) {
      return res
        .status(409)
        .json({ success: false, message: "User already exixts." });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new userModel({
      name,
      email: normalizedEmail,
      password: hashedPassword,
    });
    await user.save();
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    //Sending mail to user
    const mailOptons = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Welcome to MERN Auth",
      text: `Wealcome to MERN Authentication website. You successfully created your account with email ${email}`,
    };
    await transporter.sendMail(mailOptons);

    return res
      .status(201)
      .json({ success: true, message: "User registered successfully." });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const normalizedEmail = email.toLowerCase();
  if (!normalizedEmail || !password) {
    return res.status(400).json({
      success: false,
      message: "email and password are required",
    });
  }
  try {
    const user = await userModel.findOne({ email: normalizedEmail });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // `false` in development
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // Use "lax" instead of "strict"
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res
      .status(200)
      .json({ success: true, message: "logged in successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

const logout = (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });
    return res
      .status(200)
      .json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

// Send verification otp to user's email
const sendVerifyOtp = async (req, res) => {
  const { userId } = req.body;
  const user = await userModel.findById(userId);

  if (user.isAccountVerified) {
    return res.json({ success: false, message: "User already verified." });
  }
  const otp = String(Math.floor(100000 + Math.random() * 900000));
  user.verifyOtp = otp;
  user.verifyOtpExpiredAt = Date.now() + 24 * 60 * 60 * 1000;
  await user.save();

  const mailOptions = {
    from: process.env.SENDER_EMAIL,
    to: user.email,
    subject: "Account verification OTP",
    html: `<p>Your OTP is <b> ${otp} </b>. Verify your account using this OTP. </p>`,
  };
  await transporter.sendMail(mailOptions);
  return res.json({
    success: true,
    message: "Verification OTP send on this email.",
  });
};

// Verif email with otp
const verifyEmail = async (req, res) => {
  const { userId, otp } = req.body;
  if (!userId || !otp) {
    return res
      .status(400)
      .json({ success: false, message: "Missing details." });
  }

  try {
    const user = await userModel.findById(userId);
    if (!user) {
      return { success: false, message: "User not found." };
    }
    if (user.verifyOtp === "" || user.verifyOtp !== otp) {
      return res.json({ success: false, message: "invalid OTP" });
    }
    if (user.verifyOtpExpiredAt < Date.now()) {
      return res.json({ success: false, message: "OTP expired." });
    }

    user.isAccountVerified = true;
    user.verifyOtp = "";
    user.verifyOtpExpiredAt = 0;
    await user.save();
    return res.json({ success: true, message: "Email verified successfully." });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error." });
  }
};

// Check email and send and otp for reset password
const sendResetOtp = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res
      .status(401)
      .json({ success: false, message: "Email is required." });
  }

  const normalizedEmail = email.toLowerCase();
  try {
    const user = await userModel.findOne({ email: normalizedEmail });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    const otp = String(Math.floor(100000 + Math.random() * 900000));
    user.resetOtp = otp;
    user.resetOtpExpiredAt = Date.now() + 15 * 60 * 1000;
    await user.save();

    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: normalizedEmail,
      subject: "Password Reset OTP",
      html: `<p>Your OTP is <b> ${otp} </b>. Use this for reset password. </p>`,
    };
    await transporter.sendMail(mailOptions);
    return res
      .status(201)
      .json({ success: true, message: "OTP send on your email." });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// verify otp for Reset password
const verifyResetPasswordOTP = async (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) {
    return res.status(400).json({ success: false, message: "Missing Details" });
  }
  const normalizedEmail = email.toLowerCase();

  try {
    const user = await userModel.findOne({ email: normalizedEmail });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }
    if (user.resetOtp === "" || user.resetOtp !== otp) {
      return res.json({ success: false, message: "Invalid OTP." });
    }
    if (user.resetOtpExpiredAt < Date.now()) {
      return res.json({ success: false, message: "OTP Expired." });
    }

    user.resetOtp = "";
    user.resetOtpExpiredAt = 0;
    await user.save();

    return res
      .status(200)
      .json({ success: true, message: "OTP Verification successfull" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// change the password
const resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;
  if (!email || !newPassword) {
    return res.json({ success: false, message: "Missing Details" });
  }
  const normalizedEmail = email.toLowerCase();

  try {
    const user = await userModel.findOne({ email: normalizedEmail });
    if (!user) {
      return res.json({ success: false, message: "User not found." });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({ success: true, message: "password updated" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// Get user all details
const getUserAuthDetails = async (req, res) => {
  const { userId } = req.body;
  if (!userId) {
    return res
      .status(400)
      .json({ success: false, message: "Missing details." });
  }

  try {
    const user = await userModel.findById(userId);
    if (!user) {
      return { success: false, message: "User not found." };
    }

    return res.status(200).json({ success: true, userDetails: user });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server error." });
  }
};
export {
  register,
  login,
  logout,
  sendVerifyOtp,
  verifyEmail,
  sendResetOtp,
  resetPassword,
  verifyResetPasswordOTP,
  getUserAuthDetails,
};
