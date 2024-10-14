"use client";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

/* The `interface AuthProviderProps` is defining a TypeScript interface that specifies the expected
shape of the props that the `AuthProvider` component should receive. In this case, it has two
properties: */
interface AuthProviderProps {
  children: ReactNode;
  session: Session | null;
}

/**
 * The AuthProvider component in TypeScript React takes in children and session props and wraps them
 * with a SessionProvider component.
 * @param {AuthProviderProps}  - The `AuthProvider` component takes two parameters:
 */
const AuthProvider = ({ children, session }: AuthProviderProps): ReactNode => (
  <SessionProvider session={session}>{children}</SessionProvider>
);

export default AuthProvider;
