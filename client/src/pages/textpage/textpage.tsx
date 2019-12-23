import React from "react";

const TextPage = (props: any) => {
  // console.log("textpage props, ", props);
  const {
    location: {
      state: { message }
    }
  } = props;
  return <div>{message}</div>;
};

export default TextPage;
