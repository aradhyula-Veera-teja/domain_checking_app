"use client";
import React, { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

/* The `interface ReactQueryProviderProps` is defining a TypeScript interface named
`ReactQueryProviderProps`. This interface specifies that any object that implements it must have a
property called `children` of type `ReactNode`. This helps in type-checking and ensuring that
components receiving props of type `ReactQueryProviderProps` must include a `children` prop of type
`ReactNode`. */
interface ReactQueryProviderProps {
  children: ReactNode;
}

/**
 * The ReactQueryProvider component creates a QueryClient instance and provides it to its children
 * using QueryClientProvider.
 * @param {ReactQueryProviderProps}  - The `ReactQueryProvider` component takes in a single prop
 * `children`, which represents the child components that will be wrapped by the `QueryClientProvider`.
 * The `ReactQueryProviderProps` type is used to define the type of the props object that the component
 * expects. In this case, it specifies
 * @returns The `ReactQueryProvider` component is returning a `QueryClientProvider` component with the
 * `client` prop set to a new instance of `QueryClient`, and rendering the `children` prop passed to
 * it.
 */
const ReactQueryProvider = ({
  children,
}: ReactQueryProviderProps): ReactNode => {
  const client = new QueryClient();
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};

export default ReactQueryProvider;
