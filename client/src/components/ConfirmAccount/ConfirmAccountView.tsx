import React, { useEffect } from "react";
import Axios from "axios";
import { useState } from "react";
import { Grid, Button, Container } from "@material-ui/core";
import { Link } from "react-router-dom";

interface Props {
  token: string;
}

export default (props: Props) => {
  const { token } = props;

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({ status: null, type: "", message: "" });

  useEffect(() => {
    let isSubscribed = true;
    (async () => {
      setLoading(true);
      const {
        status,
        data: { type, message }
      } = await Axios.get(`http://127.0.0.1:4000/confirm/${token}`);
      isSubscribed && setData({ status, type, message });
      isSubscribed && setLoading(false);
    })();
    return () => {
      isSubscribed = false;
    };
  }, [setLoading, token]);

  return (
    <Container maxWidth="sm" className="sign-up">
      <h2>Validating your account</h2>
      {loading && <div>"Loading..."</div>}
      {!loading && <h1>{data.type}</h1>}
      {!loading && <h6>{data.message}</h6>}
      {data.status === 200 && (
        <Grid item xs={12} container justify="center">
          <Link to="/login">
            <Button variant="contained" color="primary">
              Login
            </Button>
          </Link>
        </Grid>
      )}
    </Container>
  );
};
