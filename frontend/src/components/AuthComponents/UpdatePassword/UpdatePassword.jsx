import React, { useState } from "react";
import "./UpdatePassword.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

const UpdatePassword = () => {
  const email = useSelector((state) => state.authHandler.email);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [err, setError] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleMessageShowing = (err) => {
    setError(err);
    setTimeout(() => {
      setError("");
    }, 8000);
  };

  const handleUpdatePassword = async () => {
    setError("");
    setLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_AUTH_URI}/reset-password`,
        {
          email: email,
          newPassword: password,
        }
      );
      if (res.status === 200) {
        navigate("/");
        return;
      }
      handleMessageShowing(res.data?.message);
    } catch (error) {
      handleMessageShowing(
        error.response?.data?.message || "Pass Updatetion failed"
      );
    } finally {
      setLoading(false);
    }
  };
// himadrihimadri1234@gmail.com
  const handleFormSubmission = () => {
    if (!password || !confirmPassword) {
      handleMessageShowing("*All fields are required.");
      return;
    }
    if (password !== confirmPassword) {
      handleMessageShowing("*Password must match.");
      return;
    }
    if (password.length < 8) {
      handleMessageShowing("*Password must 8-characters");
      return;
    }
    // write here password update logic
    handleUpdatePassword();
  };
  return (
    <div className="update-pass-container">
      <div className="update-pass-inner-container">
        <div className="descriptive-left-side">
          <div className="login-info">
            <h2>Almost Done!</h2>
            <p>
              Set a new password and regain access to your account. Make sure
              it's strong and memorable!
            </p>
          </div>
        </div>
        <div className="update-pass-page-right-side">
          <h3>Reset Password</h3>
          <p>
            Your password must be at least 8-character and should include a
            combination of numbers, letter and special character.
          </p>
          <div className="update-pass-input-div">
            <input
              type="password"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <p className="error-para">{err}</p>
          <button
            className={`update-pass-sign-up-btn ${loading && "loading-active"}`}
            onClick={handleFormSubmission}
            disabled={loading}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdatePassword;
