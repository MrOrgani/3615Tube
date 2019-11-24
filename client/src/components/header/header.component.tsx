import React from "react";
import { Link } from "react-router-dom";

import "./header.styles.scss";

const Header = () => {
  return (
    <div className="header">
      <Link className="logo-container" to="/">
        <h1 className="neon-title" data-text="3615Tube">
          3615Tube
        </h1>
      </Link>
      <div className="options">
        <Link className="option" to="/profile">
          PROFILE
        </Link>
        <Link className="option" to="/signin">
          SIGN IN
        </Link>
      </div>
    </div>
  );
};

export default Header;
