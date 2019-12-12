interface Error {
    path: string;
    msg: string;
  }
  
  export const normalizeErrors = (errors: Error[]) => {
    const errMap: { [key: string]: string } = {};
  
    errors.forEach(err => {
      errMap[err.path] = err.msg;
    });
  
    return errMap;
  };