import { useMutation, useQuery, ChildMutateProps } from "react-apollo";
import { withRouter } from "react-router-dom";
import gql from "graphql-tag";
import { register, registerVariables } from "./__generated__/RegisterMutation";

interface Props {
  children: (data: {
    submit: (values: any) => Promise<null>;
  }) => JSX.Element | null;
}
const signupMutation = gql`
  mutation registerMutation(
    $firstName: String!
    $lastName: String!
    $login: String!
    $email: String!
    $password: String!
  ) {
    register(
      firstName: $firstName
      lastName: $lastName
      login: $login
      email: $email
      password: $password
    ) {
      path
      msg
    }
  }
`;

const SignUpController = (props: Props) => {
  console.log("props SUcontroller: ", props);
  const [mutate] = useMutation(signupMutation);

  const submit = async values => {
    console.log("In SignUpController, values are: ", values);
    const { data } = await mutate({
      variables: values
    });
    console.log("In SignUpController, return of Register Mutation", data);
    if (data) {
      return data.signup;
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

export default SignUpController;
