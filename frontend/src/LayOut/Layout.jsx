import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "../App";
import Workingpage from "../pages/WorkingPage/Workingpage";
import Homepage from "../pages/HomePage/Homepage";
import Register from "../components/AuthComponents/Register/Register";
import ForgetPasswords from "../components/AuthComponents/ForgetPassword/ForgetPasswords";
import UpdatePassword from "../components/AuthComponents/UpdatePassword/UpdatePassword";

const Layout = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="/" element={<Homepage />} />
            <Route path="/pdf-chat" element={<Workingpage />} />
            <Route path="/user/auth" element={<Register />} />
            <Route path="/user/forget-password" element={<ForgetPasswords />} />
            <Route path="/user/update-password" element={<UpdatePassword />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Layout;
