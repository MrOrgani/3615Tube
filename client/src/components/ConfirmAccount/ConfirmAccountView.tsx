import React, { useEffect } from "react";
import Axios from "axios";
import { useState } from "react";

// import { Link } from "react-router-dom";

// interface FormValues {
//   email: string;
// }

interface Props {
  // status: {
  // loading: any;
  // data: any;
  // };
  token: string;
}

export default (props: Props) => {
  const { token } = props;

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const data = await Axios.get(`http://localhost:4000/confirm/${token}`);
      console.log("data is ", data);
      setLoading(false);
    })();
  }, [setLoading, token]);

  return (
    <div className="sign-up">
      <h2>Validating your account</h2>
      {loading && <div>"Loading..."</div>}
    </div>
  );
};
