"use client";
import { useContext } from "react";
import AppContext from "./AppContext";

/**
 * The function `useAppContext` returns the context value from the `AppContext` in a TypeScript React
 * application.
 * @returns The `useAppContext` function is returning the result of calling the `useContext` hook with
 * the `AppContext` as an argument.
 */
export default function useAppContext() {
  return useContext(AppContext);
}
