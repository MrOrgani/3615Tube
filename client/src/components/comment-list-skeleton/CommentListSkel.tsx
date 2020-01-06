import React, { useState, useContext } from "react";
import { Grid, Box, Card, CardHeader, Avatar } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";

import "./MoviesListSkeleton.styles.scss";
import { Form, Formik, Field } from "formik";
import UserContext from "../../pages/context";
// import CustomButton from "../button/button.component";

interface MediaProps {
  loading?: boolean;
  data?: any;
  nbOfItem?: number;
  history?: any;
  submit?: any;
}

const CommentListSkeleton = (props: MediaProps) => {
  const {
    loading = false,
    data,
    nbOfItem
    // history
  } = props;

  const result = !loading && data ? data : Array.from(new Array(nbOfItem || 5));

  const [canComment, setCanComment] = useState(true);
  const { avatar, login } = useContext(UserContext) as any;
  // console.log("user in Comment, ", user);

  return (
    <Grid container item lg={12} md={5} direction="column">
      <Box my={0.5}>
        <Card style={{ backgroundColor: "rgb(225, 225, 225)" }}>
          <CardHeader
            avatar={
              !avatar ? (
                <Skeleton variant="circle" width={40} height={40} />
              ) : (
                <Avatar alt="MyAvatar" src={avatar} />
              )
            }
            title={
              !login ? (
                <Skeleton height={10} width="80%" style={{ marginBottom: 6 }} />
              ) : (
                login
              )
            }
            subheader={
              <Formik
                initialValues={{ comment: "" }}
                onSubmit={async (
                  values
                  // actions
                ) => {
                  console.log("values ", values);
                  // const errors = await props.submit(values);
                  // if (errors) {
                  //   actions.setErrors(errors);
                  // }
                  // else {
                  setCanComment(false);
                  // }
                }}
                validateOnChange={false}
                validateOnBlur={false}
                // validationSchema={ProfileSchema}
              >
                {({ handleSubmit }) => {
                  return (
                    <Form
                      style={{
                        display: "flex",
                        // flexDirection: "column",
                        alignItems: "center"
                      }}
                      onSubmit={event => {
                        event.preventDefault();
                        handleSubmit();
                      }}
                    >
                      <Field
                        name="comment"
                        type="text"
                        // component={FieldInput}
                        placeholder="Write your comment"
                        style={{
                          backgroundColor: "#f2f3f5",
                          border: "1px solid #ccd0d5",
                          borderRadius: "16px"
                        }}
                        disabled={!canComment}
                      />
                      {/* <button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "..." : "Comment"}
                      </button> */}
                    </Form>
                  );
                }}
              </Formik>
            }
          />
        </Card>
      </Box>
      {Array.from(result).map((item: any, index: any) => (
        <Box key={index} my={0.5}>
          <Card style={{ backgroundColor: "rgba(177, 177, 177, 0.2)" }}>
            <CardHeader
              avatar={
                loading || !item ? (
                  <Skeleton variant="circle" width={40} height={40} />
                ) : (
                  item.avatar
                )
              }
              title={
                loading || !item ? (
                  <Skeleton
                    height={10}
                    width="80%"
                    style={{ marginBottom: 6 }}
                  />
                ) : (
                  item.login
                )
              }
              subheader={
                loading || !item ? (
                  <Skeleton height={10} width="40%" />
                ) : (
                  "5 hours ago"
                )
              }
            />
          </Card>
        </Box>
      ))}
    </Grid>
  );
};

export default CommentListSkeleton;
