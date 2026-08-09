"use client";

import { createContext, useContext } from "react";

export interface Group {
  id: number;
  name: string;
  creationDate: string;      
  modificationDate: string;   
}

export interface CurrentUser {
  id: number;
  userName: string;
  email: string;
  country: string;
  phoneNumber: string;
  imagePath: string | null;
  isActivated: boolean;
  group: Group;
  creationDate: string;       // ISO date string
  modificationDate: string;   // ISO date string
}

interface UserContextType {
  user: CurrentUser | null;
}

const UserContext = createContext<UserContextType | null>(null);

export default function UserProvider({
  user,
  children,
}: {
  user: CurrentUser | null;
  children: React.ReactNode;
}) {
  return (
    <UserContext.Provider value={{ user }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser must be used inside UserProvider");
  }

  return context;
}
