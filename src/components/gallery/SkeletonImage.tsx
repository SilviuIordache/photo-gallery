interface SkeletonImageProps {
  width: number;
  height: number;
}

const SkeletonImage = ({ width, height }: SkeletonImageProps) => {
  return (
    <div
      className=" w-full bg-gray-100 rounded-md"
      style={{ height, width }}
    ></div>
  );
};

export default SkeletonImage;
