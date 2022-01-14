import React, { useContext, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import logo from "./logo.png";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { Avatar, Menu, MenuItem } from "@mui/material";
import { AuthContext } from "../contexts/AuthProvider";
import "./Header.scss";

export const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const user = useContext(AuthContext);

  const handleClick = (event) => setAnchorEl(event.currentTarget);

  const handleClose = () => setAnchorEl(null);

  const handleProfile = () => {
    handleClose();
    navigate("/myprofile");
  };

  const handleLogout = () =>
    auth.signOut().then(() => {
      handleClose();
      navigate("/");
    });

  return (
    <AppBar position="static">
      <Toolbar className="header">
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
        {user?.email ? (
          <div>
            <div
              id="basic-button"
              aria-controls="basic-menu"
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              className="header__avatar"
            >
              <Avatar alt={user?.email} src={user?.photoURL || user?.email} />
              <span style={{ fontSize: "12px", color: "#f1c40f" }}>
                {user?.email}
              </span>
            </div>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem
                onClick={handleProfile}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                Mój Profil <PersonIcon />
              </MenuItem>
              <MenuItem
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
                onClick={handleLogout}
              >
                Wyloguj <LogoutIcon />{" "}
              </MenuItem>
            </Menu>
          </div>
        ) : (
          <div>
            <Link className="header__link" to="/signin">
              <Button className="header__link-button" variant="contained">
                Zaloguj
              </Button>
            </Link>
            <Link className="header__link" to="/signup">
              <Button className="header__link-button" variant="contained">
                Zarejestruj
              </Button>
            </Link>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};