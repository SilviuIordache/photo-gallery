import { Photo } from 'pexels';
import { useNavigate } from 'react-router-dom';
// import { useState, useEffect } from 'react';

interface GalleryImageProps {
  photo: Photo;
}

const GalleryImage = ({ photo }: GalleryImageProps) => {
  const navigate = useNavigate();
  // const [loadHigherQuality, setLoadHigherQuality] = useState(false);

  // after a few seconds, load higher quality image
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setLoadHigherQuality(true);
  //   }, 2000);

  //   return () => clearTimeout(timer); // Cleanup the timer on component unmount
  // }, []);

  const imageSrc = photo.src.large;

  const handleClick = () => {
    navigate(`/${photo.id}`);
  };

  return (
    <div
      onClick={handleClick}
      // onMouseEnter={() => {
      //   setLoadHigherQuality(true);
      // }}
      className="mb-4"
    >
      <img
        src={imageSrc}
        alt={photo.alt || ''}
        className="w-full h-auto rounded-lg hover:opacity-80 hover:cursor-pointer transform transition-transform duration-200 hover:scale-105"
        style={{ width: '300px', height: 'fit-content', objectFit: 'cover' }}
      />
    </div>
  );
};

export default GalleryImage;
