import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import logo from "./logo-footer.png";
import "./Footer.scss";

export const Footer = () => (
  <AppBar className="footer" position="static">
    <Toolbar className="footer__toolbar">
      <div className="footer__toolbar-logo">
        <img src={logo} alt="logo" />
        <p>All rights reserved</p>
      </div>
      <div className="footer__toolbar-socials">
        <YouTubeIcon className="footer__toolbar-social" fontSize="large" />
        <InstagramIcon className="footer__toolbar-social" fontSize="large" />
        <FacebookIcon className="footer__toolbar-social" fontSize="large" />
      </div>
    </Toolbar>
  </AppBar>
);
