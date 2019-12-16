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
  
export const changePasswordMutation = gql`
  mutation ChangePassword($email: String!) {
    changePassword(email: $email) {
        path
        msg
    }
  }
`;

const ChangePasswordController = (props: Props) => {
  const [mutate, {error}] = useMutation(changePasswordMutation);
  

  if (error) return <p>{JSON.stringify(error, null, 2)}</p>;

  const submit = async (values: any) => {
    const { data: {changePassword} } = await mutate({
      variables: values
    });
    
    if (changePassword) {
    // if (errors) {
      // return normalizeErrors(errors);
      return normalizeErrors(changePassword);
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

export default ChangePasswordController;