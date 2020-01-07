import React from "react";
import CommentController from "../../controller/CommentController";
// import LoginView from "./LoginView";
// import LoginController from "../../controller/LoginController";

const CommentConnector = (props: any) => {
  //   const onFinish = () => {
  //     const {
  //       history,
  //       location: { state }
  //     } = props;
  //     if (state && state.next) {
  //       return history.push(state.next);
  //     }

  // history.push("/");
  //   };
  console.log("Comment connector props", props);

  return (
    <CommentController>
      {({ submit }) => (
        <CommentListSkeleton
          submit={submit}
          //   onFinish={onFinish}
        />
      )}
    </CommentController>
  );
};

export default CommentConnector;
