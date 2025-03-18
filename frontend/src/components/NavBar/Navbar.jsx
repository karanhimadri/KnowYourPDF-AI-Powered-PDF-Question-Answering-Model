import React from "react";
import "./Navbar.css";
import logo from "../../assets/knowyourPDF.png";
import { NavLink, useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";

const Navbar = () => {
  const { username, email, isUserAuthorised } = useSelector(
    (state) => state.authHandler
  );
  const navigate = useNavigate();

  const handleUserLogin = () => {
    navigate("/user/auth", { state: { isLoginState: true } });
  };

  const handleGetStarted = () => {
    navigate("/user/auth");
  };

  const handleDropdown = () => {
    console.log("OK")
  }

  return (
    <div>
      <div className="navbar-container">
        <div className="inner-nav-bar">
          <div className="logo">
            <img src={logo} alt="" />
          </div>
          <div className="navbar-links">
            <NavLink className="home cmn" to="/">
              Home
            </NavLink>
            <NavLink className="service cmn">Services</NavLink>
            <NavLink className="about cmn" to="/about">
              About <sup>{`(For Recruiter)`}</sup>
            </NavLink>
            <NavLink className="contact cmn" to="/contact-us">
              Contact
            </NavLink>
          </div>
          <div className="navbar-action-btns">
            {isUserAuthorised && (
              <div className="verified-user">
                <CgProfile size={25} /> Hi, {username ? username : email}
                <div className="hk-dropdown">
                  <ul className="dropdown-menu position-static d-grid gap-1 p-2 rounded-3 mx-0 shadow w-220px " data-bs-theme="light">
                    <li onClick={handleDropdown}><a className="dropdown-item rounded-2 " href="#">Profile</a></li>
                    <li onClick={handleDropdown}><a className="dropdown-item rounded-2" href="#">Verify account</a></li>
                    <li onClick={handleDropdown}><hr className="dropdown-divider"/></li>
                    <li onClick={handleDropdown}><a className="dropdown-item rounded-2 active" href="#">Logout</a></li>
                  </ul>
                </div>
              </div>
            )}
            {!isUserAuthorised && (
              <>
                <button className="get-started-btn" onClick={handleGetStarted}>
                  Get Started
                </button>
                <button className="login-btn" onClick={handleUserLogin}>
                  LogIn
                </button>
              </>
            )}
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
