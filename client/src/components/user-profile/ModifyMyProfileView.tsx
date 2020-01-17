import React, { useContext } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import { useSpring, animated } from "react-spring/web.cjs"; // web.cjs is required for IE 11 support
import { Formik, Field } from "formik";
import Avatar from "../avatar/avatar.component";
import BuildOutlinedIcon from "@material-ui/icons/BuildOutlined";
import ClearSharpIcon from "@material-ui/icons/ClearSharp";

import {
  Grid,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Container
} from "@material-ui/core";
import FieldInput from "../FiledInput/FieldInput.component";
import { UserContext } from "../context";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    paper: {
      background: "linear-gradient(to bottom, #9282e0, #ff8fb7)",
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

export default function ModifyMyProfileView(props: any) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [myInfo, setMyInfo] = useContext(UserContext) as any;

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
          <Container maxWidth={"xs"} className={classes.paper}>
            <Formik
              initialValues={{ ...myInfo, password: "" }}
              onSubmit={async (values, actions) => {
                const errors = await props.submit(values);
                if (errors) {
                  actions.setErrors(errors);
                } else {
                  setMyInfo(values);
                  setOpen(false);
                }
              }}
              validateOnChange={false}
              validateOnBlur={false}
            >
              {({
                isSubmitting,
                errors,
                values,
                handleChange,
                handleSubmit
              }) => {
                return (
                  <Grid
                    container
                    spacing={1}
                    justify="center"
                    direction="column"
                    style={{ textAlign: "center" }}
                  >
                    <Grid
                      item
                      container
                      justify="center"
                      style={{ textAlign: "center" }}
                    >
                      <Typography variant="h6">Upload your info</Typography>
                      <ClearSharpIcon onClick={handleClose} />
                    </Grid>

                    <Grid container item justify="center">
                      <Field
                        name="avatar"
                        uploadImg={true}
                        component={Avatar}
                      />
                    </Grid>
                    <span>Click on the image to change your avatar</span>

                    {errors.avatar ? (
                      <label style={{ fontSize: "20px", color: "red" }}>
                        You must change your avatar
                      </label>
                    ) : null}

                    <Grid item container justify="center">
                      <Field
                        grid={{ xs: 12, sm: 5 }}
                        required
                        name="firstName"
                        type="text"
                        component={FieldInput}
                        label="First Name"
                        style={{ margin: "5px 0px" }}
                      />
                      <Field
                        grid={{ xs: 12, sm: 5 }}
                        required
                        name="lastName"
                        type="text"
                        label="Last Name"
                        component={FieldInput}
                        style={{ margin: "5px 0px" }}
                      />
                      <Grid item xs={12} sm={2}>
                        <FormControl
                          variant="outlined"
                          style={{ margin: "5px 0px" }}
                        >
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
                            <MenuItem value={"es"}>
                              <span role="img" aria-label="ES">
                                🇪🇸
                              </span>
                            </MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Field
                        required
                        name="login"
                        type="text"
                        label="Login"
                        component={FieldInput}
                        style={{ margin: "5px 0px" }}
                      />
                      <Field
                        required
                        name="email"
                        type="text"
                        label="Email"
                        component={FieldInput}
                        style={{ margin: "5px 0px" }}
                      />
                      <Field
                        name="password"
                        type="password"
                        label="Password"
                        component={FieldInput}
                        style={{ margin: "5px 0px" }}
                      />
                      <Grid item xs={12} sm={4}>
                        <Button
                          type="submit"
                          fullWidth
                          variant="contained"
                          color="primary"
                          disabled={isSubmitting}
                          onClick={() => handleSubmit()}
                          style={{ margin: "5px 0px" }}
                        >
                          Modify
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                );
              }}
            </Formik>
          </Container>
        </Fade>
      </Modal>
    </div>
  );
}
