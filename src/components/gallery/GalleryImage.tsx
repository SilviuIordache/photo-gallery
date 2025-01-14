import { Photo } from 'pexels';

interface GalleryImageProps {
  photo: Photo;
}

const GalleryImage = ({ photo }: GalleryImageProps) => {
  return (
    <div>
      <img src={photo.src.small} alt={photo.alt || ''} />
    </div>
  );
};

export default GalleryImage;
