import React from "react";
import { useQuery } from "react-apollo";
import gql from "graphql-tag";
import {
  // RouteProps,
  Redirect,
  Route
} from "react-router";
import { UserProvider } from "../../components/context";

export const meQuery = gql`
  query meQuery {
    me {
      lastName
      login
      firstName
      language
      avatar
    }
  }
`;

const AuthRoute = (props: any) => {
  const { data, loading } = useQuery(meQuery);
  // console.log("data in Authroute, ", data);
  const renderRoute = (routeProps: any) => {
    const { component } = props;
    console.log("data in Authroute, ", data);
    if (!data || loading) {
      // loading screen
      return null;
    }

    if (!data.me) {
      // user not logged in
      return (
        <Redirect
          to={{
            pathname: "/login",
            state: { next: routeProps.location.pathname }
          }}
        />
      );
    }

    const Component = component as any;

    return (
      <UserProvider value={data ? data.me : null}>
        <Component {...routeProps} />
      </UserProvider>
    );
  };
  const { data: _, component: __, ...rest } = props;
  return <Route {...rest} render={renderRoute} />;
};

export default AuthRoute;
