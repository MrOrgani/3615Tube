import React from "react";

import "./skeleton-item.styles.scss";
// import { string } from "prop-types";

const SkeletonItem = ({ style, className }: any) => (
  <div className={`skeleton-item ${className}`} style={style} />
);
export default SkeletonItem;
