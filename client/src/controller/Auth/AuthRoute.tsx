import React from "react";
import { useQuery } from "react-apollo";
import gql from "graphql-tag";
import {
  // RouteProps,
  Redirect,
  Route
} from "react-router";

export const meQuery = gql`
  query meQuery {
    me {
      lastName
      login
      firstName
      password
      language
      avatar
    }
  }
`;

const AuthRoute = (props: any) => {
  const { data, loading } = useQuery(meQuery);
  // console.log(data);
  const renderRoute = (routeProps: any) => {
    const { component } = props;

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

    return <Component {...routeProps} />;
  };
  const { data: _, component: __, ...rest } = props;
  return <Route {...rest} render={renderRoute} />;
};

export default AuthRoute;
