import * as React from "react";
import { useQuery } from "react-apollo";
import gql from "graphql-tag";
// import { useContext } from "react";
// import { UserContext } from "../../components/context";
// import UserProfileView from "../../components/user-profile/UserProfileView";

interface Props {
  children: (data: {
    // submit: (values: any) => Promise<any>;
    userInfo?: any;
    data?: any;
  }) => JSX.Element | null;
  userId?: string;
}

const GET_USER_INFO = gql`
  query findOne($id: String) {
    findOne(id: $id) {
      id
      language
      firstName
      lastName
      login
      avatar
    }
  }
`;

const UserProfileController = (props: Props) => {
  // const myInfo = useContext(UserContext) as any;
  // console.log("UserProfileController: props.userId", props.userId);

  const { data, loading, error } = useQuery(GET_USER_INFO, {
    variables: { id: props.userId }
  });

  if (error) return <p>{JSON.stringify(error, null, 2)}</p>;

  if (loading) return <p>Loading...</p>;
  // if (loading) return <UserProfileView loading={true} />;

  // let userInfo = myInfo;

  // if (props.userId)
  const userInfo = data ? data.findOne : null;

  // console.log("data.findOne", data, userInfo);

  return props.children({
    userInfo
  });
};

export default UserProfileController;
