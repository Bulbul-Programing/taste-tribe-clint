import { useEffect, useState } from "react";

export const useDebounce = <T>(value: T, delay = 1000) => {
  const [debounceValue, setDebounceValue] = useState(value);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timeOut = setTimeout(() => {
      setDebounceValue(value);
      setLoading(false);
    }, delay);

    return () => clearTimeout(timeOut);
  }, [value, delay]);

  return { debounceValue, loading };
};
