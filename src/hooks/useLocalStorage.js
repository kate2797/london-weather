import { useEffect, useState } from "react";

/*
 const [value, setValue] = useState(() => {
    try {
      const storedValue = window.localStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : undefined;
    } catch (error) {
      console.error(error);
      return undefined;
    }



    v app, my vraciame val, key a setter

    key passneme

    val a setter musime pouzit tu, aby to slo

*/

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
