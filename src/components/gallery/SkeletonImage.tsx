import { useEffect, useRef, useState } from 'react';

interface Props {
  height: number;
  width?: number;
}
const SkeletonImage = ({ width, height }: Props) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [renderedWidth, setRenderedWidth] = useState(0);

  useEffect(() => {
    // console.log('New Skeleton Image');
    if (divRef.current) {
      setRenderedWidth(divRef.current.offsetWidth);
    }
  }, []);

  // useEffect(() => {
  //   console.log('Received height: ', height);
  // }, [height]);

  const renderedHeight = width && renderedWidth ? height * (renderedWidth / width) : height;

  return (
    <div
      ref={divRef}
      className="bg-gray-400 rounded-md animate-pulse skeleton-animation"
      style={{
        height: renderedHeight,
        width: '100%',
      }}
    ></div>
  );
};

export default SkeletonImage;
