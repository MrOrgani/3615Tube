import * as React from "react";
import { useQuery } from "react-apollo";
import gql from "graphql-tag";
// import { normalizeErrors } from "../../utils/normalizeErrors";

// interface Props {
//   children: (data: {
//     submit: (values: any) => Promise<any>;
//   }) => JSX.Element | null;
// }

export const ConfirmAccount = gql`
  query confirmAccount($id: String!) {
    confirmAccount(id: $id) {
      msg
    }
  }
`;

const ConfirmAccountController = (props: any) => {
  const { loading, error, data } = useQuery(ConfirmAccount);

  if (error) return <p>{JSON.stringify(error, null, 2)}</p>;

  return props.children({
    loading,
    data
  });
};

export default ConfirmAccountController;
