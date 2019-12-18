import { ValidationError } from "yup";

export const formatYupError = (
  err: ValidationError,
  missingpath: string = "unknown"
) => {
  const errors: Array<{ path: string; msg: string }> = [];
  // console.log(err.inner[0].path.length > 0 ? err.inner[0].path : missingpath);
  err.inner.forEach(e => {
    errors.push({
      path: e.path ? e.path : missingpath,
      msg: e.message
    });
  });

  return errors;
};

export const formatError = (path: string, msg: string) => {
  return [{ path, msg }];
};
