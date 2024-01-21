import { useEffect, useState } from "react";

// look at used & unused

export const useLocalStorage = (key) => {
  const [value, setValue] = useState("");

  const store = (key, value) => {
    localStorage.setItem(toString(key), toString(value));
  };

  const remove = (key) => {
    localStorage.removeItem(toString(key));
  };

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  }, [key, value]);
  return [value, setValue];
};
