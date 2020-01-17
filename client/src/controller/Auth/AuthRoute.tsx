import React from "react";
import { useQuery } from "react-apollo";
import gql from "graphql-tag";
import { Redirect, Route } from "react-router";
import { CircularProgress } from "@material-ui/core";

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
  // client!.resetStore();
  // Cache.delete();
  const { data, loading, refetch } = useQuery(meQuery, {
    fetchPolicy: "no-cache"
  });
  refetch();
  console.log("useQuery(meQuery)", useQuery(meQuery));

  const renderRoute = (routeProps: any) => {
    const { component } = props;
    if (!data || loading) {
      return loading ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress size="20vh" variant="indeterminate" />
        </div>
      ) : null;
    }

    if (!data.me) {
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
