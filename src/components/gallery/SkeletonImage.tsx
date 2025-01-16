const SkeletonImage = () => {
  const minHeight = 10;
  const maxHeight = 20;

  const width = '19rem';
  const height = `${
    Math.floor(Math.random() * (maxHeight - minHeight + 1)) + minHeight
  }rem`;

  return (
    <div
      className=" w-full bg-gray-500 rounded-md"
      style={{ height, width }}
    ></div>
  );
};

export default SkeletonImage;
