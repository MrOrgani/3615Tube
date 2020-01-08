import React from "react";
import CommentsController from "../../controller/CommentsController";
import CommentsView from "./CommentsView";
// import LoginView from "./LoginView";
// import LoginController from "../../controller/LoginController";

const CommentConnector = () => {
  return (
    <CommentsController>
      {({ allCommentary, submit }) => (
        <CommentsView
          submit={submit}
          data={allCommentary}
          //   onFinish={onFinish}
        />
      )}
    </CommentsController>
  );
};

export default CommentConnector;
