import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useCountdown } from '../../hooks/useCountdown';

interface LoadMoreTriggerProps {
  loadMoreImages: () => void;
}

const LoadMoreTrigger: React.FC<LoadMoreTriggerProps> = ({
  loadMoreImages,
}) => {
  const { ref, inView } = useInView();
  const [showTrigger, setShowTrigger] = useState(true);

  const loadImagesCallback = () => {
    loadMoreImages();
    setShowTrigger(false);
    startPauseCountdown();
  };

  const {
    countdown: imagesCountdown,
    isCountdownRunning: isImagesCountdownRunning,
    startCountdown: startImagesCountdown,
  } = useCountdown(3, loadImagesCallback);

  const {
    isCountdownRunning: isPauseCountdownRunning,
    startCountdown: startPauseCountdown,
  } = useCountdown(1, () => setShowTrigger(true));

  useEffect(() => {
    if (inView && !isImagesCountdownRunning && showTrigger) {
      startImagesCountdown();
    }
  }, [inView, isImagesCountdownRunning, startImagesCountdown, showTrigger]);

  useEffect(() => {
    if (!showTrigger && !isPauseCountdownRunning) {
      startPauseCountdown();
    }
  }, [showTrigger, isPauseCountdownRunning, startPauseCountdown]);

  if (!showTrigger) return null;
  return (
    <p ref={ref} className="mt-10 text-3xl">
      {isImagesCountdownRunning
        ? `Loading more in ${imagesCountdown}...`
        : null}
    </p>
  );
};

export default LoadMoreTrigger;
