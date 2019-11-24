import React from "react";

import "./button.styles.scss";

const CustomButton: any = ({ children, buttonColor, ...otherprops }) => {
  return (
    <button className={`${buttonColor} button`} {...otherprops}>
      {children}
    </button>
  );
};

export default CustomButton;
