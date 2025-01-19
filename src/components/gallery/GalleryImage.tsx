import { Photo } from 'pexels';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import SkeletonImage from './SkeletonImage';

interface GalleryImageProps {
  photo: Photo;
}

const GalleryImage = ({ photo }: GalleryImageProps) => {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);

  const handleClick = () => {
    navigate(`/${photo.id}`);
  };

  useEffect(() => {
    const img = new Image();
    img.src = photo.src.medium;
    img.onload = () => setIsLoaded(true);
  }, [photo.src.medium]);

  return (
    <div onClick={handleClick} className="mb-4">
      {!isLoaded && <SkeletonImage height={450} width={300} />}
      <img
        src={photo.src.medium}
        alt={photo.alt || ''}
        className={`w-full h-auto rounded-lg hover:opacity-80 hover:cursor-pointer transform transition-transform duration-200 hover:scale-105 ${
          isLoaded ? '' : 'hidden'
        }`}
        style={{ width: '300px', height: 'fit-content', objectFit: 'cover' }}
        onLoad={() => setIsLoaded(true)}
      />
    </div>
  );
};

export default GalleryImage;
