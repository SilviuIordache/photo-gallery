import { Photo } from 'pexels';
import { useNavigate } from 'react-router-dom';
// import { useState, useEffect } from 'react';

interface GalleryImageProps {
  photo: Photo;
}

const GalleryImage = ({ photo }: GalleryImageProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/${photo.id}`);
  };

  return (
    <div onClick={handleClick} className="mb-4">
      <img
        src={photo.src.medium}
        alt={photo.alt || ''}
        className="w-full h-auto rounded-lg hover:opacity-80 hover:cursor-pointer transform transition-transform duration-200 hover:scale-105"
        style={{ width: '300px', height: 'fit-content', objectFit: 'cover' }}
      />
    </div>
  );
};

export default GalleryImage;
