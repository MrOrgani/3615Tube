import { ValidationError } from "yup";

export const formatYupError = (err: ValidationError) => {
  const errors: Array<{ path: string; msg: string }> = [];
  // console.log(err);
  err.inner.forEach(e => {
    errors.push({
      path: e.path,
      msg: e.message
    });
  });

  return errors;
};

export const formatError = (path: string, msg: string) => {
  return [{ path, msg }];
};
