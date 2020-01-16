import React from "react";

const TextPage = (props: any) => {
  const {
    location: {
      state: { message }
    }
  } = props;
  return (
    <div className="sign-up" style={{ background: "black", color: "white" }}>
      {message}
    </div>
  );
};

export default TextPage;
