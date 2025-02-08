import { useEffect, useState } from 'react';

export const useCountdown = (initialValue: number, onComplete: () => void) => {
  const [countdown, setCountdown] = useState(initialValue);
  const [isCountdownRunning, setIsCountdownRunning] = useState(false);

  const startCountdown = () => {
    setCountdown(initialValue);
    setIsCountdownRunning(true);
  };

  useEffect(() => {
    if (!isCountdownRunning || countdown <= 0) return;

    const timeout = setTimeout(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [countdown, isCountdownRunning]); // ✅ Now countdown is included safely

  // Separate effect for when countdown reaches 0
  useEffect(() => {
    if (countdown === 0 && isCountdownRunning) {
      setIsCountdownRunning(false);
      onComplete();
    }
  }, [countdown, isCountdownRunning, onComplete]);

  return { countdown, isCountdownRunning, startCountdown };
};
