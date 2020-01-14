import React, { useContext } from "react";
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
import {
  Grid,
  Button,
  Container,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from "@material-ui/core";
import FieldInput from "../FiledInput/FieldInput.component";
import { UserContext } from "../../pages/context";

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
  const [myInfo, setMyInfo] = useContext(UserContext) as any;

  console.log("userInfo,", myInfo);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const inputLabel = React.useRef<HTMLLabelElement>(null);
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
              initialValues={myInfo}
              onSubmit={async (values, actions) => {
                // console.log("values, in Myprofile view ", values);
                const errors = await props.submit(values);
                // console.log("error on Myprofile, ", errors);
                if (errors) {
                  actions.setErrors(errors);
                } else {
                  setOpen(false);
                  setMyInfo({ ...myInfo, values });
                  // props.onFinish();
                }
              }}
              validateOnChange={false}
              validateOnBlur={false}
              validationSchema={ProfileSchema}
            >
              {({ isSubmitting, errors, values, handleChange }) => {
                return (
                  <Container component="main" maxWidth="md">
                    <Grid container spacing={1} justify="center">
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
                        <span>Click on the image to change your avatar</span>

                        {errors.avatar ? (
                          <label style={{ fontSize: "20px", color: "red" }}>
                            You must change your avatar
                          </label>
                        ) : null}

                        <Grid item container spacing={2} justify="center">
                          <Field
                            grid={{ xs: 12, sm: 5 }}
                            required
                            name="firstName"
                            type="text"
                            component={FieldInput}
                            label="First Name"
                          />
                          <Field
                            grid={{ xs: 12, sm: 5 }}
                            required
                            name="lastName"
                            type="text"
                            label="Last Name"
                            component={FieldInput}
                          />
                          <Grid item xs={12} sm={2}>
                            <FormControl variant="outlined">
                              <InputLabel
                                ref={inputLabel}
                                id="demo-simple-select-outlined-label"
                              >
                                Language
                              </InputLabel>
                              <Select
                                name="language"
                                value={values.language}
                                onChange={handleChange}
                              >
                                <MenuItem value={"fr"}>
                                  <span role="img" aria-label="france">
                                    🇫🇷
                                  </span>
                                </MenuItem>
                                <MenuItem value={"en"}>
                                  <span role="img" aria-label="UK">
                                    🇬🇧
                                  </span>
                                </MenuItem>
                                {/* <MenuItem value={30}>Thirty</MenuItem> */}
                              </Select>
                            </FormControl>
                          </Grid>
                          <Field
                            required
                            name="login"
                            type="text"
                            label="Login"
                            component={FieldInput}
                          />
                          <Field
                            required
                            name="email"
                            type="text"
                            label="Email"
                            component={FieldInput}
                          />
                          <Field
                            name="password"
                            type="password"
                            label="Password"
                            component={FieldInput}
                          />
                          <Grid item xs={12} sm={4}>
                            <Button
                              type="submit"
                              fullWidth
                              variant="contained"
                              color="primary"
                              disabled={isSubmitting}
                            >
                              Modify
                            </Button>
                          </Grid>
                        </Grid>
                      </Form>
                    </Grid>
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
