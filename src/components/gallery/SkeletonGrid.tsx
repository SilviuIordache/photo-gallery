import SkeletonImage from './SkeletonImage';

const SkeletonGrid = () => {
  const skeletons = Array.from({ length: 11 }, (_, index) => (
    <SkeletonImage key={`skeleton-${index}`} />
  ));

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">{skeletons}</div>
  );
};

export default SkeletonGrid;
