import React from "react";

const UserContext = React.createContext({});

export const UserProvider = UserContext.Provider;
export const UserConsumer = UserContext.Consumer;
// export UserContext;

const MovieContext = React.createContext({});

export const MovieProvider = MovieContext.Provider;
export const MovieConsumer = MovieContext.Consumer;

export { MovieContext, UserContext };
