import { useState, useEffect } from "react";
import { AuthData } from "../context/auth-context";

export const useLocalStorage = (key: string, initialState: AuthData | null) => {
  const id = `${key}_ls`;
  const [value, setValue] = useState<AuthData | null>(function () {
    if (initialState) return initialState;

    const valueFromStorage = window.localStorage.getItem(id);
    if (valueFromStorage) {
      return JSON.parse(valueFromStorage) as AuthData;
    }
    return null;
  });

  useEffect(() => {
    if (value) {
      window.localStorage.setItem(id, JSON.stringify(value));
    } else {
      window.localStorage.removeItem(id);
    }
  }, [value]);

  return { value, setValue };
};
