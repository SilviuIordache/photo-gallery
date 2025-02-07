import React, { useEffect, useState, useRef } from 'react';
import { useInView } from 'react-intersection-observer';

interface LoadMoreTriggerProps {
  loadMoreImages: () => void;
}

const LoadMoreTrigger: React.FC<LoadMoreTriggerProps> = ({
  loadMoreImages,
}) => {
  const { ref, inView } = useInView();
  const intervalRef = useRef<number>();
  const [countdown, setCountdown] = useState<number>(3);
  const [isCountdownRunning, setIsCountdownRunning] = useState(false);

  useEffect(() => {
    if (inView && !isCountdownRunning) {
      setCountdown(3);
      setIsCountdownRunning(true);
    }
  }, [inView, isCountdownRunning]);

  useEffect(() => {
    if (countdown === 0) {
      loadMoreImages();
      setCountdown(3);
    }

    if (countdown > 0) {
      intervalRef.current = setTimeout(() => {
        setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }

    return () => {
      if (intervalRef.current) clearTimeout(intervalRef.current);
    };
  }, [countdown, loadMoreImages]);

  return (
    <p ref={ref} className="mt-10 text-3xl">
      {isCountdownRunning ? `Loading more in ${countdown}...` : null}
    </p>
  );
};

export default LoadMoreTrigger;
