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
    <div onClick={handleClick}>
      <img src={photo.src.small} alt={photo.alt || ''} />
    </div>
  );
};

export default GalleryImage;
