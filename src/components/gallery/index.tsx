import { useEffect, useState } from 'react';
import getPhotos from '../../services/photo/getPhotos';
import type { PhotosWithTotalResults, ErrorResponse } from 'pexels';

const Gallery = () => {
  const [photos, setPhotos] = useState<
    PhotosWithTotalResults | ErrorResponse | null
  >(null);

  useEffect(() => {
    const fetchPhotos = async () => {
      const result = await getPhotos('nature');
      setPhotos(result);
    };
    fetchPhotos();
  }, []);

  console.log(photos);
  return <div className="bg-gray-200">Gallery</div>;
};

export default Gallery;
