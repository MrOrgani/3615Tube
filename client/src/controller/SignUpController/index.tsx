import { useMutation, useQuery } from "react-apollo";
import { withRouter } from "react-router-dom";
import gql from "graphql-tag";

const signupMutation = gql`
  mutation register(
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
    )
  }
`;

const SignUpController = props => {
  const [mutate] = useMutation(signupMutation, {
    variables: {
      firstName: "Max",
      lastName: "Org",
      login: "morg",
      email: "morg@gmail.com",
      password: "Hello*!1"
    }
  });

  mutate();
  console.log(mutate);
  // async function submit(values) {
  //   const { data } = await mutate({
  //     variables: values
  //   });
  // if (data) {
  //   return data.signup;
  // }
  // console.log("data is", query);
  //   return null;
  // }

  // function onFinish() {
  //   props.history.push("/");
  // }

  return props.children({
    // submit
    //  onFinish
  });
};

export default withRouter(SignUpController);
