import SkeletonImage from './SkeletonImage';

const SkeletonGrid = () => {
  const skeletons = Array.from({ length: 11 }, (_, index) => (
    <SkeletonImage key={index} />
  ));

  return <div className="masonry-grid">{skeletons}</div>;
};

export default SkeletonGrid;
