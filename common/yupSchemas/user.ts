import * as Yup from "yup";

export const PasswordValidation = Yup.string()
  .matches(/[0-9]/, "It must contain at least 1 digit")
  .matches(/[a-z]/, "It must contain at least 1 letter")
  .matches(/[A-Z]/, "It must contain at least 1 capital letter")
  .matches(/[§!@#$%^&*()]/, "It must contain one of these chars: '§!@#$%^&*()")
  .min(6, "Too Short! Min 6 chars")
  .required("Required");

export const EmailValidation = Yup.string()
  .email("Invalid email")
  .required("Required");

export const PasswordSchema = Yup.object().shape({
  password: PasswordValidation
});

export const CommentsSchema = Yup.object().shape({
  text: Yup.string()
    .min(2, "Too Short!")
    .max(100, "Too Long!")
    .matches(/^[a-zA-Z0-9-_ !.?&@]+$/, "Only letters & digits!")
    .required("Required")
});

export const FiltersSchema = Yup.object().shape({
  orderKey: Yup.string()
    .min(2, "Too Short!")
    .max(100, "Too Long!")
    .matches(/^[a-zA-Z0-9-_ !.?&@]+$/, "Only letters & digits!")
    .required("Required")
});

export const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "Too Short!")
    .max(30, "Too Long!")
    .matches(/^[a-zA-Z-_]+$/, "Only letters!")
    .required("Required"),
  lastName: Yup.string()
    .min(2, "Too Short!")
    .max(30, "Too Long!")
    .matches(/^[a-zA-Z-_]+$/, "Only letters!")
    .required("Required"),
  login: Yup.string()
    .min(2, "Too Short!")
    .max(30, "Too Long!")
    .matches(/^[a-zA-Z0-9-_]+$/, "Only letters & digits!")
    .required("Required"),
  email: Yup.string()
    .email("Invalid email")
    .required("Required"),
  password: PasswordValidation
});

const invalidLogin = "invalid login !";

export const SignInSchema = Yup.object().shape({
  login: Yup.string()
    .min(2, invalidLogin)
    .max(30, invalidLogin)
    .matches(/^[a-zA-Z0-9-_]+$/, "Only letters & digits!")
    .required("Required"),
  password: PasswordValidation
});

export const ChangePasswordSchema = Yup.object().shape({
  newPassword: PasswordValidation
});

export const ProfileSchema = Yup.object().shape({
  avatar: Yup.string().required("Please, upload a picture"),
  firstName: Yup.string()
    .min(2, "Too Short!")
    .max(20, "Too Long!")
    .matches(/^[a-zA-Z-_]+$/, "Only letters!")
    .required("Required"),
  lastName: Yup.string()
    .min(2, "Too Short!")
    .max(20, "Too Long!")
    .matches(/^[a-zA-Z-_]+$/, "Only letters!")
    .required("Required"),
  login: Yup.string()
    .min(2, "Too Short!")
    .max(20, "Too Long!")
    .matches(/^[a-zA-Z0-9-_]+$/, "Only letters & digits!")
    .required("Required"),
  email: Yup.string()
    .email("Invalid email")
    .required("Required"),
  password: Yup.string()
    .matches(/[0-9]/, "It must contain at least 1 digit")
    .matches(/[a-z]/, "It must contain at least 1 letter")
    .matches(/[A-Z]/, "It must contain at least 1 capital letter")
    .matches(
      /[§!@#$%^&*()]/,
      "It must contain one of these chars: '§!@#$%^&*()"
    )
    .min(6, "Too Short! Min 6 chars")
});
