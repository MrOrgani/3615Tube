import React, { useState, useContext } from "react";
import {
  Grid,
  Box,
  Card,
  CardHeader,
  Avatar,
  Typography
} from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";

import "./MoviesListSkeleton.styles.scss";
import { Form, Formik, Field } from "formik";
import { UserContext, MovieContext } from "../../pages/context";
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

const CommentListItem = (props: MediaProps) => {
  const { data, loading } = props;
  console.log("props, ", props);

  const [canComment, setCanComment] = useState(true);
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
                onSubmit={async (values, actions) => {
                  console.log("values ", values);
                  const errors = await props.submit(values);
                  if (errors) {
                    actions.setErrors(errors);
                  } else {
                    setCanComment(false);
                  }
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
                        name="text"
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
      {data &&
        Array.from(data).map((item: any, index: any) => (
          <Grid container item key={`Com-${index}`} spacing={0}>
            <Grid style={{ backgroundColor: "rgba(177, 177, 177, 0.2)" }}>
              <Grid item>
                <Avatar alt="Author Avatar" src={item.authorId.avatar} />
              </Grid>
              <Grid item>
                <Typography>{item.authorId.login}</Typography>
              </Grid>
              <Grid item>
                <Typography>{item.text}</Typography>
              </Grid>
            </Grid>
          </Grid>
        ))}
    </Grid>
  );
};

export default CommentListItem;
