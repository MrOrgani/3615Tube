import * as React from "react";
import { useQuery } from "react-apollo";
import gql from "graphql-tag";
import { useContext } from "react";
import { UserContext } from "../../components/context";

interface Props {
  children: (data: {
    // submit: (values: any) => Promise<any>;
    userInfo?: any;
    data?: any;
  }) => JSX.Element | null;
  userId?: string;
}

const GET_USER_INFO = gql`
  query findOne($login: String) {
    findOne(id: $login) {
      id
      firstName
      lastName
      login
      avatar
    }
  }
`;

const UserProfileController = (props: Props) => {
  const myInfo = useContext(UserContext) as any;
  console.log("UserProfileController: myInfo", myInfo);

  const { data, loading, error: errorQuery } = useQuery(GET_USER_INFO, {
    variables: { id: props.userId }
  });

  if (errorQuery) return <p>{JSON.stringify(errorQuery, null, 2)}</p>;

  if (loading) return <p>Loading...</p>;

  let userInfo = myInfo;

  if (props.userId) userInfo = data;

  console.log("data.findOne", data, userInfo);

  return props.children({
    userInfo
  });
};

export default UserProfileController;
