import {useEffect, useState} from "react";

export default function useCount() {
  const [count, setCount] = useState(1);

  useEffect(() => {
    if (count === 0 || count === 5) return;
    const timeout = setTimeout(() => {
      setCount(count => count + 1);
    }, count * 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, [count]);

  const button = <button onClick={() => setCount(count == 0 ? 1 : 0)}>{count === 0 ? 'Restart' : 'Reset'}</button>;

  return [count, button];
};
