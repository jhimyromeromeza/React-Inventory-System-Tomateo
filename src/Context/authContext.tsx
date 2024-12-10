import { createContext, useState, ReactNode } from "react";
import { User } from "./types";

// Define the type for the user object

// Define the context type

// Define the props for the provider component
interface AuthContextProviderProps {
  children: ReactNode;
}

// Create the context with a default value of null
export const AuthContext = createContext({});

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [authUser, setAuthUser] = useState<Array<User>>();

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};