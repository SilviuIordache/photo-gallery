import { Photo } from 'pexels';
import { useNavigate } from 'react-router-dom';

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
        src={photo.src.small}
        alt={photo.alt || ''}
        className="w-full rounded-lg hover:opacity-80 hover:cursor-pointer transform transition-transform duration-200 hover:scale-105"
        width={photo.width}
        height={photo.height}
      />
    </div>
  );
};

export default GalleryImage;
