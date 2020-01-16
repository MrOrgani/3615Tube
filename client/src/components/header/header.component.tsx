import React, { useContext, useState, useEffect } from "react";
import SettingsIcon from "@material-ui/icons/Settings";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import "./header.styles.scss";
import { Link } from "react-router-dom";
import { UserContext } from "../context";
import SettingsPowerOutlinedIcon from "@material-ui/icons/SettingsPowerOutlined";
import VideocamOutlinedIcon from "@material-ui/icons/VideocamOutlined";
import { Grid } from "@material-ui/core";

const Header = () => {
  const myInfo = useContext(UserContext) as any;

  const [connectedUser, setConnectedUser] = useState(false);

  useEffect(() => setConnectedUser(myInfo[0] ? true : false), [myInfo]);
  // console.log("Header myinfo", );
  const logInlogOut = !connectedUser ? (
    <Link className="option" to="/login">
      <AccountCircleIcon />
    </Link>
  ) : (
    <Link className="option" to="/logout">
      <SettingsPowerOutlinedIcon />
    </Link>
  );

  return (
    // <div className="header">
    <Grid container justify="flex-start" alignItems="center" className="header">
      <Grid item xs container justify="flex-start">
        <Grid item>
          <Link to={!connectedUser ? "/" : "/movies"}>
            <div className="logo-container">3615Tube</div>
          </Link>
        </Grid>
      </Grid>
      {/* <div className="options"> */}
      <Grid item container xs justify="flex-end">
        <Grid item>
          <Link className="option" to="/movies">
            <VideocamOutlinedIcon />
          </Link>
        </Grid>
        <Grid item>
          <Link className="option" to="/profile">
            <SettingsIcon />
          </Link>
        </Grid>
        <Grid item>{logInlogOut}</Grid>
        {/* </div> */}
        {/* </div> */}
      </Grid>
    </Grid>
  );
};

export default Header;
