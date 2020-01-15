import React from "react";

const UserContext = React.createContext({});

export const UserProvider = UserContext.Provider;
export const UserConsumer = UserContext.Consumer;
// export UserContext;

const MovieContext = React.createContext({});

export const MovieProvider = MovieContext.Provider;
export const MovieConsumer = MovieContext.Consumer;

const MovieListContext = React.createContext({});

export const MovieListProvider = MovieListContext.Provider;
export const MovieListConsumer = MovieListContext.Consumer;

const TorrentContext = React.createContext({});

export const TorrentProvider = TorrentContext.Provider;
export const TorrentConsumer = TorrentContext.Consumer;

export { MovieContext, UserContext, MovieListContext, TorrentContext };
