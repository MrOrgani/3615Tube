import * as React from "react";
import { useMutation } from "react-apollo";
import gql from "graphql-tag";
import { normalizeErrors } from "../../utils/normalizeErrors";

interface Props {
  children: (data: {
    submit: (values: any) => Promise<any>;
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
    $avatar: String
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
  const [mutate, { error }] = useMutation(profileMutation);

  if (error) return <p>{JSON.stringify(error, null, 2)}</p>;

  const submit = async (values: any) => {
    const {
      data: { update }
    } = await mutate({
      variables: values
    });

    if (update) {
      return normalizeErrors(update);
    }
    return null;
  };

  return props.children({
    submit
  });
};

export default ModifyMyProfileController;
