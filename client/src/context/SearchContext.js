import React, { createContext, useEffect, useReducer } from "react";

const INITIAL_STATE = (() => {
  const savedState = JSON.parse(localStorage.getItem("search"), (key, value) => {
    return value;
  });

  return {
    title: undefined,
    ...savedState,
  };
})();

export const SearchContext = createContext(INITIAL_STATE);

const SearchReducer = (state, action) => {
  switch (action.type) {
    case "NEW_SEARCH":
      return action.payload;
    case "RESET_SEARCH":
      return INITIAL_STATE;
    default:
      return state;
  }
};

export const SearchContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(SearchReducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("search", JSON.stringify({
      title: state.title,
    }));
  }, [state.title]);

  return (
    <SearchContext.Provider
      value={{
        title: state.title,
        dispatch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};