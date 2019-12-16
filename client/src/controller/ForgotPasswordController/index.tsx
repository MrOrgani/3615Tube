import * as React from 'react'
import { useMutation, 
} from "react-apollo";
import gql from "graphql-tag";
import { normalizeErrors } from '../../utils/normalizeErrors';

interface Props {
  children: (data: {
    submit: (values: any) => Promise<any>;
  }) => JSX.Element | null;
}

const forgotPasswordMutation = gql`
  mutation ForgotPassword($email: String!) {
    forgotPassword(email: $email) {
        path
        msg
    }
  }
`;

const ForgotPasswordController = (props: Props) => {
  const [mutate, {error}] = useMutation(forgotPasswordMutation);
  

  if (error) return <p>{JSON.stringify(error, null, 2)}</p>;

  const submit = async (values: any) => {
    const { data: {forgot} } = await mutate({
      variables: values
    });
    
    if (forgot) {
    // if (errors) {
      // return normalizeErrors(errors);
      return normalizeErrors(forgot);
    }

    return null;
  };

  // function onFinish() {
  //   props.history.push("/");
  // }

  return props.children({
    submit
    //  onFinish
  });
};

export default ForgotPasswordController;