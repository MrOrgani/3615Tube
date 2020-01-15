import { ValidationError } from "yup";

//This is used to format Errors so as to send them back to the
//requester in the awaited way : {path, msg}

export const formatYupError = (
  err: ValidationError,
  missingpath: string = "unknown"
) => {
  const errors: Array<{ path: string; msg: string }> = [];
  // console.log(err.inner[0].path.Olength > 0 ? err.inner[0].path : missingpath);

  err.inner.forEach(e => {
    errors.push({
      path: e.path ? e.path : missingpath,
      msg: e.message
    });
  });
  // console.log("in formatyup errors", errors);
  return errors;
};

export const formatError = (path: string, msg: string) => {
  return [{ path, msg }];
};
