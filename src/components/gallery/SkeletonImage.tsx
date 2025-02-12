import { useEffect, useRef, useState } from "react";

interface Props {
  width?: number;
  height: number; 
}

const SkeletonImage = ({ height, width }: Props) => {
  const skeletonRef = useRef<HTMLDivElement>(null);
  const [renderedHeight, setRenderedHeight] = useState(450);

  useEffect(() => {
    const updateHeight = () => {
      if (!skeletonRef.current) return; // Ensure the ref is available

      const renderedWidth = skeletonRef.current.offsetWidth;

      if (renderedWidth > 0 && width) {
        const heightValue = height * (renderedWidth / width);
        setRenderedHeight(heightValue); // Maintain aspect ratio
      }
    };

    // // Delay initial update to ensure correct width is available
    setTimeout(updateHeight, 0);

    // TODO: investigate if this is needed
    // Observe width changes
    const resizeObserver = new ResizeObserver(updateHeight);
    if (skeletonRef.current) {
      resizeObserver.observe(skeletonRef.current);
    }

    return () => resizeObserver.disconnect();
  }, [height, width]);

  return (
    <div
      ref={skeletonRef}
      className="bg-gray-400 rounded-md animate-pulse skeleton-animation"
      style={{
        height: `${renderedHeight}px`,
        width: "100%",
      }}
    ></div>
  );
};

export default SkeletonImage;
