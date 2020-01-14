import React, { useState, useContext, useEffect } from "react";
import {
  Grid,
  Box,
  Card,
  CardHeader,
  Avatar,
  Typography,
  Paper
} from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";

import "./MoviesListSkeleton.styles.scss";
import { Form, Formik, Field } from "formik";
import { UserContext, MovieContext } from "../../pages/context";
import { Link } from "react-router-dom";
import FieldInput from "../FiledInput/FieldInput.component";
import { CommentsSchema } from "../../common";
// import CustomButton from "../button/button.component";

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
      title={<Skeleton height={10} width="80%" style={{ marginBottom: 6 }} />}
      subheader={<Skeleton height={10} width="40%" />}
    />
  </Card>
);

const CommentsView = ({ data, loading, submit }: MediaProps) => {
  const [canComment, setCanComment] = useState(true);
  const [comments, setComments] = useState([]) as any;
  useEffect(() => setComments(data ? data : []), [setComments, data]);
  const { avatar, login } = useContext(UserContext) as any;
  const imdbId = useContext(MovieContext) as any;
  // console.log("data, ", data);

  return (
    <Grid container item lg={12} md={5} direction="column">
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
                onSubmit={async values => {
                  const myComment = await submit(values);
                  setComments(
                    !comments.length ? [myComment] : [...comments, myComment]
                  );
                  setCanComment(false);
                }}
                validateOnChange={false}
                validateOnBlur={false}
                validationSchema={CommentsSchema}
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
                        name="text"
                        type="text"
                        // component={FieldInput}
                        placeholder="Write your comment"
                        style={{
                          backgroundColor: "#f2f3f5",
                          border: "1px solid #ccd0d5",
                          borderRadius: "16px"
                        }}
                        component={FieldInput}
                        disabled={!canComment}
                      />
                    </Form>
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
          <Grid container item key={`Com-${index}`} spacing={0} direction="row">
            <Paper
              style={{
                width: "inherit"
                // margin: `20px auto`
                // padding: 5
              }}
            >
              <Grid container>
                <Grid item>
                  <Link to={`/profile/${item.authorId.id}`}>
                    <Avatar alt="Author Avatar" src={item.authorId.avatar} />
                  </Link>
                </Grid>
                <Grid item xs>
                  <Typography>{item.authorId.login}</Typography>
                </Grid>
                <Grid item xl>
                  <Typography variant="subtitle1">{item.text}</Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        ))}
    </Grid>
  );
};

export default CommentsView;
