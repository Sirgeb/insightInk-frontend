"use client";

import React, { createContext, useContext, useState } from "react";
import { getLoggedInUserAction } from "../actions/auth-action";

type User = {
  id: string;
  firstname: string;
  lastname: string;
  picture: string;
  email: string;
} | null;

export type UserContextType = {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  refreshUser: () => Promise<void>;
};

export const UserContext = createContext<UserContextType | undefined>(
  undefined,
);

type UserProviderProps = {
  children: React.ReactNode;
  initialState?: User;
};

export function UserProvider({
  children,
  initialState = null,
}: UserProviderProps) {
  const [user, setUser] = useState<User>(initialState);

  const refreshUser = async () => {
    const res = await getLoggedInUserAction();
    if (res.ok) {
      setUser(res.user);
    } else {
      console.error(res.message);
      setUser(null);
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, refreshUser }}>
      {children}
    </UserContext.Provider>
  );
}

// Custom hook to access user context
export const useUser = (): UserContextType => {
  const ctx = useContext(UserContext);
  if (!ctx)
    throw new Error(
      "UserContext is not available. Make sure you wrap your component in UserProvider.",
    );
  return ctx;
};
