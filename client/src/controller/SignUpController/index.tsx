import { useMutation, useQuery } from "react-apollo";
import { withRouter } from "react-router-dom";
import gql from "graphql-tag";

// const signupMutation = gql`
//   mutation Signup($email: String!, $name: String!, $password: String!) {
//     signup(email: $email, name: $name, password: $password) {
//       path
//       message
//     }
//   }
// `;

const helloQuery = gql`
  query Hello($name: String!) {
    hello(name: $name)
  }
`;

const SignUpController = props => {
  const query = useQuery(helloQuery, { variables: { name: "MAx" } });
  if (query.data) console.log(query.data.hello);

  // const [mutate] = useMutation(signupMutation);

  // async function submit(values) {
  // const { data } = await query({ variables: {name: "Max" }});
  //   mutate({
  // variables: values
  //   });
  //   if (data) {
  //     return data.signup;
  //   }
  //   console.log("data is", query);
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
