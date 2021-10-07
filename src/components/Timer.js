import {useEffect, useState} from "react";

export default function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(seconds => seconds + 1);
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  },[]);

  return <>
    <span className="fixed">{seconds} seconds passed...</span>
    <style jsx>{`
      .fixed {
        position: fixed;
        bottom: 1rem;
        right: 1rem;
        width: 300px;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid #eaeaea;
        background-color: black;
        color: white;
      }
    `}</style>
  </>
  
};
