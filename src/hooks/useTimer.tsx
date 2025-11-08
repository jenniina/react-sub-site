import { useState, useEffect, useCallback } from "react";

type Precision = "1s" | "1ms";

const useTimer = (active: boolean, precision: Precision) => {
  const [timer, setTimer] = useState<number>(0);

  const resetTimer = useCallback(() => {
    setTimer(0);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (active) {
      setTimer(precision === "1s" ? 0 : 0.0);
      const intervalDuration = precision === "1s" ? 1000 : 100; // milliseconds
      const increment = precision === "1s" ? 1 : 0.1;

      interval = setInterval(() => {
        setTimer((prev) => {
          const updatedTimer = prev + increment;
          return precision === "1s"
            ? updatedTimer
            : parseFloat(updatedTimer.toFixed(1));
        });
      }, intervalDuration);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [active, precision]);

  return { timer, resetTimer };
};

export default useTimer;
