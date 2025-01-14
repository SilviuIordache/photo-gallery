import { useEffect, useState } from 'react';
import getPhotos from '../../services/apiMethods/getPhotos';
import type { PhotosWithTotalResults, ErrorResponse } from 'pexels';
import GalleryImage from './GalleryImage';

const Gallery = () => {
  const [photos, setPhotos] = useState<
    PhotosWithTotalResults | ErrorResponse | null
  >(null);

  useEffect(() => {
    const fetchPhotos = async () => {
      const result = await getPhotos('animals');

  
      setPhotos(result);
    };

    fetchPhotos();
  }, []);

  console.log(photos);

  if (!photos) return <div>Loading...</div>;
  return (
    <div className="bg-gray-200">
      Gallery
      <GalleryImage photo={photos?.photos[0]} />
    </div>
  );
};

export default Gallery;
