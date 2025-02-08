import { useEffect, useRef, useState } from 'react';

export const useCountdown = (
  initialValue: number,
  onComplete: () => void,
  countdownName?: string
) => {
  const intervalRef = useRef<number>();
  const [countdown, setCountdown] = useState<number>(initialValue);
  const [isCountdownRunning, setIsCountdownRunning] = useState(false);

  const startCountdown = () => {
    console.log(`${countdownName} countdown started`);
    setCountdown(initialValue);
    setIsCountdownRunning(true);
  };

  useEffect(() => {
    if (countdown === 0) {
      console.log(`${countdownName} countdown is 0`);
      onComplete();
      setIsCountdownRunning(false);
      setCountdown(initialValue);
    }

    if (countdown > 0 && isCountdownRunning) {
      intervalRef.current = setTimeout(() => {
        setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }

    return () => {
      if (intervalRef.current) clearTimeout(intervalRef.current);
    };
  }, [countdown, onComplete, isCountdownRunning, initialValue, countdownName]);

  return { countdown, isCountdownRunning, startCountdown };
};