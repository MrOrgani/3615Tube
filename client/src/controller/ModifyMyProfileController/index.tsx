import * as React from "react";
import { useMutation } from "react-apollo";
import gql from "graphql-tag";
import { normalizeErrors } from "../../utils/normalizeErrors";
import { useContext } from "react";
import { UserContext } from "../../components/context";

interface Props {
  children: (data: {
    submit: (values: any) => Promise<any>;
    myInfo?: any;
    data?: any;
  }) => JSX.Element | null;
  userId?: string;
}

const profileMutation = gql`
  mutation Update(
    $firstName: String!
    $lastName: String!
    $login: String!
    $email: String!
    $password: String
    $avatar: String!
    $language: String!
  ) {
    update(
      firstName: $firstName
      lastName: $lastName
      login: $login
      email: $email
      password: $password
      avatar: $avatar
      language: $language
    ) {
      path
      msg
    }
  }
`;

const ModifyMyProfileController = (props: Props) => {
  const myInfo = useContext(UserContext) as any;

  const [mutate, { error }] = useMutation(profileMutation);

  if (error) return <p>{JSON.stringify(error, null, 2)}</p>;

  const submit = async (values: any) => {
    const {
      data: { update }
    } = await mutate({
      variables: values
    });

    // console.log("My profil controller, ", result);
    if (update) {
      return normalizeErrors(update);
    }
    return null;
  };

  return props.children({
    submit,
    myInfo
  });
};

export default ModifyMyProfileController;
