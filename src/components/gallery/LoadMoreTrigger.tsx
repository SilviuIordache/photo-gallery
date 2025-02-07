import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

interface LoadMoreTriggerProps {
  loadMoreImages: () => void;
  isFetchingMore: boolean;
  loadCountdown: number | null;
}

const LoadMoreTrigger: React.FC<LoadMoreTriggerProps> = ({
  loadMoreImages,
  isFetchingMore,
  loadCountdown,
}) => {
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      loadMoreImages();
    }
  }, [inView, loadMoreImages]);

  return (
    <div ref={ref} className="mt-10">
      {isFetchingMore ? 'Loading more...' : `Loading more in ${loadCountdown}...`}
    </div>
  );
};

export default LoadMoreTrigger;