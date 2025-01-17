const SkeletonImage = () => {
  const minHeight = 25;
  const maxHeight = 30;

  const height = `${
    Math.floor(Math.random() * (maxHeight - minHeight + 1)) + minHeight
  }rem`;

  const width = '18.5rem';

  return (
    <div
      className=" w-full bg-gray-300 rounded-md"
      style={{ height, width }}
    ></div>
  );
};

export default SkeletonImage;
