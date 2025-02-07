import React, { useCallback, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

interface LoadMoreTriggerProps {
  loadMoreImages: () => void;
}

const LoadMoreTrigger: React.FC<LoadMoreTriggerProps> = ({
  loadMoreImages,
}) => {
  const { ref, inView } = useInView();

  const [loadCountdown, setLoadCountdown] = useState<number | null>(3);

  const loadImages = useCallback(() => {
    if (loadCountdown !== null) return;

    loadMoreImages();
    setLoadCountdown(3);
  }, [loadCountdown, loadMoreImages]);

  // used to update the loadCountdown state
  useEffect(() => {
    if (loadCountdown === null) return;

    const interval = setInterval(() => {
      setLoadCountdown((prevCountdown) => {
        if (prevCountdown === 1) {
          clearInterval(interval);
          return null;
        }
        return prevCountdown! - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [loadCountdown]);

  useEffect(() => {
    if (inView) {
      loadImages();
    }
  }, [inView, loadImages]);

  return (
    <div ref={ref} className="mt-10">
      {`Loading more in ${loadCountdown}...`}
    </div>
  );
};

export default LoadMoreTrigger;
