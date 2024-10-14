"use client";
import { createContext, SetStateAction, Dispatch } from "react";

/* The `export interface AppContextType` is defining a TypeScript interface named `AppContextType`.
This interface specifies the shape of the context object that will be used within a React
application. Here's a breakdown of what each property in the interface represents: */
export interface AppContextType {
  numDomainsRequired: number;
  increase: () => void;
  decrease: () => void;
  setNumDomainsRequired: Dispatch<SetStateAction<number>>;
}

/* This code snippet is creating a context object named `AppContext` using the `createContext` function
provided by React. The `createContext` function takes an initial value as an argument, which in this
case is an object that conforms to the `AppContextType` interface. */
const AppContext = createContext<AppContextType>({
  numDomainsRequired: 0,
  increase: () => {},
  decrease: () => {},
  setNumDomainsRequired: () => {},
});
export default AppContext;
