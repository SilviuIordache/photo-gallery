const SkeletonImage = () => {
  return (
    <div
      className="bg-gray-400 rounded-md animate-pulse skeleton-animation"
      style={{
        height: 450,
        width: '100%',
      }}
    ></div>
  );
};

export default SkeletonImage;
