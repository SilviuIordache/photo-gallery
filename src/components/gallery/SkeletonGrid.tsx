import SkeletonImage from './SkeletonImage';

const SkeletonGrid = () => {
  const skeletons = Array.from({ length: 11 }, (_, index) => (
    <SkeletonImage key={index} height={450} width={300} />
  ));

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">{skeletons}</div>
  );
};

export default SkeletonGrid;
