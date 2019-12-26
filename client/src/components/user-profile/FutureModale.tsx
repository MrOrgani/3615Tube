import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import { useSpring, animated } from "react-spring/web.cjs"; // web.cjs is required for IE 11 support
import { Formik, Form, Field } from "formik";
import FieldInput from "../FiledInput/FieldInput.component";
import Avatar from "../avatar/avatar.component";
import CustomButton from "../button/button.component";
import { ProfileSchema } from "../../common";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    },
    paper: {
      backgroundColor: "grey",
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3)
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
  console.log("props of sprin modal", props);
  const { userInfo } = props;
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <button type="button" onClick={handleOpen}>
        react-spring
      </button>
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
            <span>Upload your info</span>
            <Formik
              initialValues={{ ...userInfo, newPassowrd: "" }}
              onSubmit={async (values, actions) => {
                const errors = await props.submit(values);
                if (errors) {
                  actions.setErrors(errors);
                } else {
                  props.onFinish();
                }
                console.log("values of formik", values, actions);
              }}
              validateOnChange={false}
              validateOnBlur={false}
              validationSchema={ProfileSchema}
            >
              {({
                // values,
                handleSubmit,
                isSubmitting

                //  setFieldValue
              }) => {
                return (
                  <Form style={{ display: "flex", flexDirection: "column" }}>
                    {/* <Avatar
                    // values={values}
                    // setFieldValue={setFieldValue}
                  /> */}
                    <Field name="avatar" uploadImg={true} component={Avatar} />
                    <Field
                      name="firstName"
                      label="First name"
                      type="text"
                      component={FieldInput}
                      placeholder="First Name"
                    />
                    <Field
                      name="lastName"
                      label="Last name"
                      type="text"
                      placeholder="Last Name"
                      component={FieldInput}
                    />
                    <Field
                      name="login"
                      label="Login"
                      type="text"
                      placeholder="Login"
                      component={FieldInput}
                    />
                    <Field
                      name="email"
                      email="Email"
                      type="text"
                      placeholder="Email"
                      component={FieldInput}
                    />
                    <Field
                      name="password"
                      label="Password"
                      type="password"
                      placeholder="Password"
                      component={FieldInput}
                    />
                    <Field
                      name="newPassword"
                      label="New Password"
                      type="password"
                      placeholder="New Password"
                      component={FieldInput}
                    />
                    <div>
                      <CustomButton
                        type="submit"
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Loading ..." : "Modify"}
                      </CustomButton>
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
