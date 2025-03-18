import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/NavBar/Navbar";
import "./App.css";

const App = () => {
  return (
    <>
      <div className="nav-bar">
        <Navbar />
      </div>
      <Outlet />
    </>
  );
};

export default App;
