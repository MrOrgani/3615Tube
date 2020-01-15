import React, { useContext } from "react";
// import { useQuery } from "react-apollo";
// import gql from "graphql-tag";
import {
  // RouteProps,
  Redirect,
  Route
} from "react-router";
import { UserContext } from "../../components/context";

const AuthRoute = (props: any) => {
  const userAuthed = useContext(UserContext) as any;

  const renderRoute = (routeProps: any) => {
    const { component } = props;

    if (!userAuthed) {
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
