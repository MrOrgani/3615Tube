import React, { useContext } from "react";
import { useQuery } from "react-apollo";
import gql from "graphql-tag";
import { Redirect, Route } from "react-router";
import { CircularProgress } from "@material-ui/core";
import { UserContext } from "../../components/context";
export const meQuery = gql`
  query meQuery {
    me {
      lastName
      login
      firstName
      language
      avatar
      email
    }
  }
`;

const AuthRoute = (props: any) => {
  const [, setMyInfo] = useContext(UserContext) as any;
  // client!.resetStore();
  // Cache.delete();
  const { data, loading, refetch } = useQuery(meQuery, {
    fetchPolicy: "no-cache"
  });
  refetch();
  setMyInfo(data && data.me);

  const renderRoute = (routeProps: any) => {
    const { component } = props;
    if (!data || loading) {
      return loading ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress size="20vh" variant="indeterminate" />
        </div>
      ) : null;
    }

    if (data.me) {
      const Component = component as any;
      return <Component {...routeProps} />;
    } else
      return (
        <Redirect
          to={{
            pathname: "/login",
            state: { next: routeProps.location.pathname }
          }}
        />
      );
  };
  const { data: _, component: __, ...rest } = props;
  return <Route {...rest} render={renderRoute} />;
};

export default AuthRoute;
