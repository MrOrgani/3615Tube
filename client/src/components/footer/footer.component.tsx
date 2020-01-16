import React from "react";
import "./footer.styles.scss";
import { Typography } from "@material-ui/core";

const Footer: any = () => {
  return (
    <div className="footer">
      <Typography variant="caption">
        Made with{" "}
        <span role="img" aria-label="coffee">
          ♥
        </span>
        /
        <span role="img" aria-label="coffee">
          ☕️
        </span>{" "}
        by morgani & vlecoq-v & mtordjma & Piabdo
      </Typography>
    </div>
  );
};

export default Footer;
