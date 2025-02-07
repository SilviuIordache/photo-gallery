import React, { useCallback, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

interface LoadMoreTriggerProps {
  loadMoreImages: () => void;
}

const LoadMoreTrigger: React.FC<LoadMoreTriggerProps> = ({
  loadMoreImages,
}) => {
  const { ref, inView } = useInView();

  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(3);

  const loadImages = useCallback(() => {
    if (isLoading) return;

    setIsLoading(true);
    setCountdown(3);
    loadMoreImages();
  }, [isLoading, loadMoreImages]);

  // used to update the loading state
  useEffect(() => {
    if (!isLoading) return;

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsLoading(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isLoading]);

  useEffect(() => {
    if (inView) {
      loadImages();
    }
  }, [inView, loadImages]);

  return (
    <p ref={ref} className="mt-10 text-3xl">
      {isLoading ? `Loading more in ${countdown}...` : null}
    </p>
  );
};

export default LoadMoreTrigger;
