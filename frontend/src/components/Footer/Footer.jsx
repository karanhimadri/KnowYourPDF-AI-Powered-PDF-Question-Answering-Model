import React from "react";
import "./Footre.css";
import logo from "../../assets/knowyourPDF.png";
import { FaYoutube } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="company-bar">
        <img src={logo} alt="" />
        <p className="footer-para">
          Chat with any PDF: ask questions, get summaries, find information, and
          more.
        </p>
        <div className="social-media-icon">
          <FaTwitter className="twitter" />
          <FaInstagram className="instagram" />
          <FaFacebook className="facebook" />
          <FaYoutube className="youtube" />
        </div>
      </div>
      <div className="products-bar">
        <div className="footer-header">Products</div>
        <div className="footer-options">
          <p>Use Cases</p>
          <p>Chrome extension</p>
          <p>API docs</p>
          <p>Pricing</p>
          <p>Video tutorials</p>
          <p>Resources</p>
          <p>Blog</p>
          <p>FAQ</p>
        </div>
      </div>
      <div className="service-bar">
        <div className="footer-header">We also built</div>
        <div className="footer-options">
          <p>Resume AI Scanner</p>
          <p>Invoice AI Scanner</p>
          <p>AI Quiz Generator</p>
          <p>QuickyAI</p>
          <p>Doctrine</p>
          <p>PDF GPTs</p>
          <p>PDF AI Generator</p>
          <p>Other PDF Tools</p>
        </div>
      </div>
      <div className="legal-bar">
        <div className="footer-header">Company</div>
        <div className="footer-options">
          <p>KnowYourPDF vs PDF.ai</p>
          <p>KnowYourPDF vs Acrobat Reader</p>
          <p>Legal</p>
          <p>Affliate Program</p>
          <p>Investor</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
