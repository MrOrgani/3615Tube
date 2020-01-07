import React from "react";
import CommentController from "../../controller/CommentController";
import CommentListItem from "../CommentListItem/CommentListItem";
// import LoginView from "./LoginView";
// import LoginController from "../../controller/LoginController";

const CommentConnector = () => {
  return (
    <CommentController>
      {({ allCommentary, submit }) => (
        <CommentListItem
          submit={submit}
          data={allCommentary}
          //   onFinish={onFinish}
        />
      )}
    </CommentController>
  );
};

export default CommentConnector;
