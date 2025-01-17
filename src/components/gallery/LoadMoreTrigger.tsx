import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

interface LoadMoreTriggerProps {
  onInView: () => void;
  isFetchingMore: boolean;
  loadCountdown: number | null;
}

const LoadMoreTrigger: React.FC<LoadMoreTriggerProps> = ({
  onInView,
  isFetchingMore,
  loadCountdown,
}) => {
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      onInView();
    }
  }, [inView, onInView]);

  return (
    <div ref={ref} className="mt-10">
      {isFetchingMore ? 'Loading more...' : `Loading more in ${loadCountdown}...`}
    </div>
  );
};

export default LoadMoreTrigger;