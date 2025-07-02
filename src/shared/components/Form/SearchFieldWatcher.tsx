import { useEffect, useRef } from 'react';

interface Props {
  value: string;
  onChange: (value: string) => void;
  delay?: number;
}

const SearchFieldWatcher = ({ value, onChange, delay = 400 }: Props) => {
  const timeout = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (timeout.current) clearTimeout(timeout.current);
    timeout.current = setTimeout(() => {
      onChange(value);
    }, delay);

    return () => clearTimeout(timeout.current);
  }, [value]);

  return null;
};

export default SearchFieldWatcher;
