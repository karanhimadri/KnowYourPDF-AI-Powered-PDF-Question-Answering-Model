import React, { useEffect, useState } from "react";
import "./Register.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  getAuthDetails,
  updateAuthDetails,
} from "../../../features/authDetails/authSlice";
import { useDispatch } from "react-redux";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [authState, setAuthState] = useState(true);
  const [err, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    setAuthState(!location.state?.isLoginState);
  }, [location.state]);

  const showMessage = (err) => {
    setError(err);
    setTimeout(() => {
      setError("");
    }, 10000);
  };

  const handleOnChange = (e) => {
    setFormData((pre) => ({ ...pre, [e.target.name]: e.target.value }));
  };

  const isEmailValid = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleUserRegister = async () => {
    try {
      setLoading(true);
      const res = await axios.post(
        `${import.meta.env.VITE_AUTH_URI}/register`,
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }
      );
      if (res.status === 201) {
        dispatch(
          updateAuthDetails({
            userId: "",
            username: formData.name,
            email: formData.email,
            isUSerAuthorised: true,
            isAccountVerified: false,
          })
        );
        navigate("/pdf-chat");
      }
    } catch (error) {
      showMessage(error.response?.data?.message || "*Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const handleUserLogIn = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_AUTH_URI}/login`,
        {
          email: formData.email,
          password: formData.password,
        },
        { withCredentials: true } // ✅ Required for sending & receiving cookies
      );

      if (res.status === 200) {
        dispatch(getAuthDetails());
        navigate("/pdf-chat");
      }
    } catch (error) {
      showMessage(error.response?.data?.message || "*LogIn failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmission = () => {
    const { name, email, password, confirmPassword } = formData;
    console.log(formData);
    if (!email || !password) {
      showMessage("*All fields are required");
      setFormData((pre) => ({ ...pre, password: "" }));
      return;
    }
    if (!isEmailValid(email)) {
      showMessage("*Enter a valid email address");
      return;
    }
    if (authState) {
      if (!name || !confirmPassword) {
        showMessage("*All fields are required");
        return;
      }
      if (password !== confirmPassword) {
        showMessage("*Passwords must match");
        setFormData((pre) => ({ ...pre, password: "", confirmPassword: "" }));
        return;
      }
      if (password.length < 8) {
        showMessage("*Password must 8-characters");
        return;
      }
      handleUserRegister();
    } else {
      handleUserLogIn();
    }
  };

  const handleForgetPassword = () => {
    navigate("/user/forget-password");
  };

  return (
    <div className="register-container">
      <div className="register-inner-container">
        <div className="descriptive-left-side">
          <div className="login-info">
            {authState ? (
              <>
                <h2>Join Us Today!</h2>
                <p>
                  To start your journey with us, please register with your
                  details.
                </p>
              </>
            ) : (
              <>
                <h2>Welcome Back !</h2>
                <p>
                  To keep connected with us please login with your credential
                </p>
              </>
            )}
          </div>
          <button
            className="login-sign-in-btn"
            onClick={() => setAuthState((pre) => !pre)}
          >
            {authState ? "LogIn" : "Create Account"}
          </button>
        </div>
        <div className="register-page-right-side">
          {authState ? <h3>Create Account</h3> : <h3>LogIn</h3>}
          <div className="register-input-div">
            {authState && (
              <input
                type="text"
                placeholder="Name"
                name="name"
                value={formData.name}
                onChange={handleOnChange}
              />
            )}
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleOnChange}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleOnChange}
            />
            {authState && (
              <input
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleOnChange}
              />
            )}
            {!authState && (
              <p className="forget-password" onClick={handleForgetPassword}>
                Forgot password?
              </p>
            )}
          </div>
          <p className="error-para">{err}</p>
          <button
            className={`register-sign-up-btn ${loading && "loading-active"}`}
            onClick={handleFormSubmission}
            disabled={loading}
          >
            {authState ? "Register" : "LogIn"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
