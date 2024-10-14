"use client";
import React, { ReactNode, useState } from "react";
import AppContext from "./AppContext";

/* The `interface AppContextProviderProps` is defining a TypeScript interface for the props that the
`AppContextProvider` component expects to receive. In this case, it specifies that the `children`
prop should be of type `ReactNode`, which is a generic type for a React node that can represent any
valid JSX children, such as components, elements, or strings. This interface helps to enforce type
checking and provide clarity on the expected props for components that use `AppContextProvider`. */
interface AppContextProviderProps {
  children: ReactNode;
}

/**
 * The AppContextProvider function in TypeScript React manages the state of the number of domains
 * required and provides functions to increase or decrease this value.
 * @param {AppContextProviderProps}  - The code you provided is a React component called
 * `AppContextProvider` that serves as a context provider using the `AppContext` context. It maintains
 * a state `numDomainsRequired` and provides functions to increase and decrease this value within
 * certain limits.
 * @returns The `AppContextProvider` component is being returned. It is a functional component that
 * provides context for the `numDomainsRequired` state and functions to update it. The component wraps
 * its children with the `AppContext.Provider`, passing down the state and functions through the
 * context value.
 */
const AppContextProvider = ({
  children,
}: AppContextProviderProps): ReactNode => {
  const [numDomainsRequired, setNumDomainsRequired] = useState(0);

  return (
    <AppContext.Provider
      value={{
        numDomainsRequired: numDomainsRequired,
        setNumDomainsRequired: setNumDomainsRequired,
        increase: () => {
          setNumDomainsRequired((previous) => {
            if (previous > 5) {
              return 5;
            }
            return previous + 1;
          });
        },
        decrease: () => {
          setNumDomainsRequired((previous) => {
            if (previous <= 0) {
              return 0;
            }
            return previous - 1;
          });
        },
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
