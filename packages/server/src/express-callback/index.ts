const makeExpressCallBack = (controller: Function) => {
  return (req: any, res: any) => {
    const httpRequest = {
      body: req.body,
      query: req.query,
      params: req.params,
      ip: req.ip,
      method: req.method,
      path: req.path,
      headers: {
        "Content-Type": req.get("Content-Type"),
        Referer: req.get("referer"),
        "User-Agent": req.get("User-Agent")
      }
    };
    controller(httpRequest)
      .then((httpResponse: any) => {
        if (httpResponse.headers) {
          res.set(httpResponse.headers);
        }
        res.type("json");
        res.status(httpResponse.statusCode).send(httpResponse.body);
      })
      .catch((err: any) => {
        res.status(500).send({ error: "An Unknown error occured." });
      });
  };
};

export default makeExpressCallBack;
