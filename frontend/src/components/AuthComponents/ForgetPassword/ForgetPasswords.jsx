import React, { useRef, useState } from "react";
import "./ForgetPassword.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { updateAuthDetails } from "../../../features/authDetails/authSlice";
import { useDispatch } from "react-redux";

const ForgetPasswords = () => {
  const inputsRef = useRef([]);
  const [email, setEmail] = useState("");
  const [authState, setAuthState] = useState(true);
  const [err, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const messageShowing = (err) => {
    setError(err);
    setTimeout(() => {
      setError("");
    }, 9000);
  };
  const handleEmailValidation = async () => {
    setError("");
    setLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_AUTH_URI}/send-reset-otp`,
        {
          email: email,
        }
      );
      if (res.status === 201) {
        dispatch(updateAuthDetails({ email: email }));
        setAuthState((pre) => !pre);
        return;
      }
      messageShowing(res.data?.message);
    } catch (error) {
      messageShowing(
        error.response?.data?.message || "*Internal server error."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleOTPVerification = async () => {
    setError("");
    setLoading(true);
    const otp = inputsRef.current.map((input) => input.value).join("");
    if (!otp) {
      messageShowing("*OTP is missing");
      return;
    }
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_AUTH_URI}/verify-password-otp`,
        {
          email: email,
          otp: otp,
        }
      );
      if (res.status === 200) {
        navigate("/user/update-password");
        return;
      }
      messageShowing(res.data?.message);
    } catch (error) {
      messageShowing(error.response?.data?.message) ||
        "*OTP verification failed.";
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmission = () => {
    if (authState && email) {
      handleEmailValidation();
    } else if (!authState) {
      handleOTPVerification();
    } else {
      messageShowing("*Email is required");
    }
  };

  const handleInput = (e, index) => {
    const value = e.target.value;
    if (value.length === 1 && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };
  return (
    <div className="forget-pass-container">
      <div className="forget-pass-inner-container">
        <div className="descriptive-left-side">
          <div className="login-info">
            <h2>We’ve Got You Covered!</h2>
            <p>
              Forgot your password? No problem! Follow the steps to reset it and
              get back to exploring.
            </p>
          </div>
        </div>
        <div className="forget-pass-page-right-side">
          {authState ? (
            <h3>Find your account</h3>
          ) : (
            <h3>Enter security code</h3>
          )}
          {authState
            ? "Please enter your email to find your account."
            : "Please check your email. A 6-digit code has been sent to you."}
          <div className="forget-pass-input-div">
            <div className="forget-pass-otp-holder">
              {!authState && (
                <div className="otp-container">
                  {[...Array(6)].map((_, index) => (
                    <input
                      key={index}
                      type="text"
                      maxLength="1"
                      ref={(el) => (inputsRef.current[index] = el)}
                      onInput={(e) => handleInput(e, index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      className="otp-input"
                    />
                  ))}
                </div>
              )}
            </div>
            {authState && (
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            )}
          </div>
          <p className="error-para">{err}</p>
          <button
            className={`forget-pass-sign-up-btn ${loading && "loading-active"}`}
            onClick={handleFormSubmission}
            disabled={loading}
          >
            {authState ? "Send Code" : "Verify"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgetPasswords;
