import { useEffect, useState } from 'react';

export function useDebounce(value: string, delay: number = 300): string {
  const [debounce, setDebounce] = useState(value);

  useEffect(() => {
    // adding listener
    const handler = setTimeout(() => setDebounce(value), delay);
    // clear listener if someting was changed
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debounce;
}
