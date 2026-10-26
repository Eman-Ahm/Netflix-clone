import React from "react";
import "./footer.css";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";

function Footer() {
  return (
    <div className="footer_outer_container">
      <div className="footer_inner_container">
        {/* Social Icons */}
        <div className="footer_icons">
          <FacebookOutlinedIcon />
          <InstagramIcon />
          <YouTubeIcon />
        </div>

        {/* Footer Links */}
        <div className="footer_data">
          <ul>
            <li>Audio Description</li>
            <li>Investor Relations</li>
            <li>Legal Notices</li>
            <li>Privacy</li>
          </ul>

          <ul>
            <li>Help Center</li>
            <li>Jobs</li>
            <li>Cookie Preferences</li>
            <li>Gift Cards</li>
          </ul>

          <ul>
            <li>Media Center</li>
            <li>Terms of Use</li>
            <li>Corporate Information</li>
            <li>Contact Us</li>
          </ul>

          <ul>
            <li>Account</li>
            <li>Ways to Watch</li>
            <li>Speed Test</li>
            <li>Only on Netflix</li>
          </ul>
        </div>

        {/* Service Code */}
        <div className="service_code">Service Code</div>

        {/* Copyright */}
        <p className="copy_write">© 2025 MovieApp • All Rights Reserved</p>
      </div>
    </div>
  );
}

export default Footer;
