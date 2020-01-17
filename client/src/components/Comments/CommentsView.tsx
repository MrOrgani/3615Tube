import React, { useState, useContext, useEffect } from "react";
import {
  Grid,
  Box,
  Card,
  CardHeader,
  Avatar,
  Button,
  Container
} from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";

import "./MoviesListSkeleton.styles.scss";
import { Formik, Field } from "formik";
import { UserContext, MovieContext } from "../context";
import { Link } from "react-router-dom";
import FieldInput from "../FiledInput/FieldInput.component";
import { CommentsSchema } from "../../common";

interface MediaProps {
  loading?: boolean;
  data?: any;
  nbOfItem?: number;
  history?: any;
  submit?: any;
}

const CommentSkeletonItem = (
  <Card>
    <CardHeader
      avatar={<Skeleton variant="circle" width={40} height={40} />}
      title={<Skeleton height={10} width="80%" />}
      subheader={<Skeleton height={10} width="40%" />}
    />
  </Card>
);

const CommentsView = ({ data, loading, submit }: MediaProps) => {
  const [comments, setComments] = useState([]) as any;
  useEffect(() => setComments(data ? data : []), [setComments, data]);
  const [{ avatar, login }] = useContext(UserContext) as any;
  const imdbId = useContext(MovieContext) as any;

  return (
    <Container maxWidth="md" style={{ height: "40vh", overflow: "auto" }}>
      <Grid container item direction="column">
        <Box my={0.5}>
          <Card style={{ backgroundColor: "rgb(225, 225, 225)" }}>
            <CardHeader
              avatar={<Avatar alt="MyAvatar" src={avatar} />}
              title={login}
              subheader={
                <Formik
                  initialValues={{
                    text: "",
                    imdbId: imdbId
                  }}
                  onSubmit={async (values, action) => {
                    const myComment = await submit(values);
                    myComment &&
                      setComments(
                        !comments.length
                          ? [myComment]
                          : [myComment, ...comments]
                      );
                    action.resetForm();
                  }}
                  validateOnChange={false}
                  validateOnBlur={false}
                  validationSchema={CommentsSchema}
                >
                  {({ handleSubmit }) => {
                    return (
                      <>
                        <Field
                          name="text"
                          type="text"
                          placeholder="Write your comment"
                          style={{
                            backgroundColor: "#f2f3f5",
                            border: "1px solid #ccd0d5",
                            borderRadius: "16px"
                          }}
                          component={FieldInput}
                        />
                        <Button
                          type="submit"
                          fullWidth
                          variant="contained"
                          color="primary"
                          onClick={() => handleSubmit()}
                        >
                          Send
                        </Button>
                      </>
                    );
                  }}
                </Formik>
              }
            />
          </Card>
        </Box>
        {loading &&
          Array.from(new Array(4)).map((_, index: number) => (
            <Box key={`ComSkel-${index}`} my={0.5}>
              {CommentSkeletonItem}
            </Box>
          ))}
        {comments &&
          !loading &&
          Array.from(comments).map((item: any, index: any) => (
            <Box key={`ComSkel-${index}`} my={0.5}>
              <Card style={{ backgroundColor: "rgb(225, 225, 225)" }}>
                <CardHeader
                  avatar={
                    <Link to={`/profile/${item.authorId.id}`}>
                      <Avatar alt="Author Avatar" src={item.authorId.avatar} />
                    </Link>
                  }
                  title={`${item.authorId.login} (${item.createdAt})`}
                  subheader={item.text}
                />
              </Card>
            </Box>
          ))}
      </Grid>
    </Container>
  );
};

export default CommentsView;
