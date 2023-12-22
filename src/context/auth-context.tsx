import { useLocalStorage } from "../hooks/uselocalStorage";
import React from "react";

export type AuthData = {
  email: string;
  access_token: string;
};
export type AuthContextType = {
  auth: AuthData | null;
  setAuth: (auth: AuthData) => void;
};
const initialValue: AuthContextType = {
  auth: null,
  setAuth: () => {
    //Just empty body
  },
};

const AuthContext = React.createContext<AuthContextType>(initialValue);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { value, setValue } = useLocalStorage("auth", null);

  const setAuth = (auth: AuthData) => {
    setValue(auth);
  };

  return <AuthContext.Provider value={{ auth: value, setAuth }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => React.useContext(AuthContext);
