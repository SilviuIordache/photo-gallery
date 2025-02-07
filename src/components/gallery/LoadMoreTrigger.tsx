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
  const [countdown, setCountdown] = useState(3);
  const [isCountdownActive, setIsCountdownActive] = useState(false);

  useEffect(() => {
    if (inView) {
      setCountdown(3);
      setIsCountdownActive(true);
    }
  }, [inView]);

  useEffect(() => {
    if (!isCountdownActive) return;

    intervalRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          setIsCountdownActive(false);
          loadMoreImages();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isCountdownActive, loadMoreImages]);

  return (
    <p ref={ref} className="mt-10 text-3xl">
      {isCountdownActive ? `Loading more in ${countdown}...` : null}
    </p>
  );
};

export default LoadMoreTrigger;
