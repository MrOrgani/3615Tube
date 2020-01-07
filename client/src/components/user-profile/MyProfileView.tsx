import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import { useSpring, animated } from "react-spring/web.cjs"; // web.cjs is required for IE 11 support
import { Formik, Form, Field } from "formik";
// import FieldInput from "../FiledInput/FieldInput.component";
import Avatar from "../avatar/avatar.component";
// import CustomButton from "../button/button.component";
import { ProfileSchema } from "../../common";
import BuildOutlinedIcon from "@material-ui/icons/BuildOutlined";
import { Grid, TextField, Button, Container } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    paper: {
      background: "linear-gradient(to right, #feac5e, #c779d0, #4bc0c8)",
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      borderRadius: "20px"
    }
  })
);

interface FadeProps {
  children?: React.ReactElement;
  in: boolean;
  onEnter?: () => {};
  onExited?: () => {};
}

const Fade = React.forwardRef<HTMLDivElement, FadeProps>(function Fade(
  props,
  ref
) {
  const { in: open, children, onEnter, onExited, ...other } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter();
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited();
      }
    }
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {children}
    </animated.div>
  );
});

export default function SpringModal(props: any) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const { userInfo } = props;
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="icon-modify">
      <BuildOutlinedIcon
        className="user-profile-container"
        onClick={handleOpen}
      />
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <Formik
              initialValues={{ ...userInfo, newPassowrd: "" }}
              onSubmit={async (values, actions) => {
                console.log("values, in Myprofile view ", values);
                const errors = await props.submit(values);
                if (errors) {
                  actions.setErrors(errors);
                } else {
                  setOpen(false);
                  props.onFinish();
                }
              }}
              validateOnChange={false}
              validateOnBlur={false}
              validationSchema={ProfileSchema}
            >
              {({ isSubmitting, errors, values, handleChange }) => {
                return (
                  <Container component="main" maxWidth="xs">
                    <Form
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center"
                      }}
                    >
                      <span>Upload your info</span>

                      <Field
                        name="avatar"
                        uploadImg={true}
                        component={Avatar}
                      />
                      {errors.avatar ? (
                        <label style={{ fontSize: "10px", color: "red" }}>
                          You must change your avatar
                        </label>
                      ) : null}

                      <Grid container spacing={2} justify="center">
                        <Grid item xs={12} sm={6}>
                          <TextField
                            autoComplete="fname"
                            name="firstName"
                            variant="outlined"
                            required
                            fullWidth
                            id="firstName"
                            label="First Name"
                            autoFocus
                            value={values.firstName}
                            onChange={handleChange}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="lastName"
                            label="Last Name"
                            name="lastName"
                            autoComplete="lname"
                            value={values.lastName}
                            onChange={handleChange}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="login"
                            label="Login"
                            name="login"
                            value={values.login}
                            onChange={handleChange}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            value={values.email}
                            onChange={handleChange}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            variant="outlined"
                            fullWidth
                            name="password"
                            label="New Password"
                            type="password"
                            id="password"
                            onChange={handleChange}
                          />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                          <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            // className={classes.submit}
                            disabled={isSubmitting}
                          >
                            Modify
                          </Button>
                        </Grid>
                      </Grid>
                    </Form>
                  </Container>
                );
              }}
            </Formik>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
