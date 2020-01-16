import React, { useContext } from "react";
import SettingsIcon from "@material-ui/icons/Settings";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import "./header.styles.scss";
import { Link } from "react-router-dom";
import { UserContext } from "../context";
import SettingsPowerOutlinedIcon from "@material-ui/icons/SettingsPowerOutlined";
import VideocamOutlinedIcon from "@material-ui/icons/VideocamOutlined";

const Header = () => {
  const user = useContext(UserContext);
  const logInlogOut = !user ? (
    <Link className="option" to="/login">
      <AccountCircleIcon />
    </Link>
  ) : (
    <Link className="option" to="/logout">
      <SettingsPowerOutlinedIcon />
    </Link>
  );

  return (
    <div className="header">
      <Link to="/">
        <div className="logo-container">3615Tube</div>
      </Link>
      <div className="options">
        <Link className="option" to="/movies">
          <VideocamOutlinedIcon />
        </Link>
        <Link className="option" to="/profile">
          <SettingsIcon />
        </Link>
        {logInlogOut}
      </div>
    </div>
  );
};

export default Header;
