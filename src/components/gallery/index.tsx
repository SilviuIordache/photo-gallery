import usePhotosQuery from '../../queries/usePhotosQuery';
import GalleryImage from './GalleryImage';
import type { PhotosWithTotalResults } from 'pexels';

const Gallery = () => {
  const { data, isLoading, error } = usePhotosQuery({
    query: 'animals',
    per_page: 5,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data || !('photos' in data)) return <div>No photos found</div>;

  const photos = (data as PhotosWithTotalResults).photos;
  return (
    <div>
      Gallery
      {photos.map((photo) => (
        <GalleryImage key={photo.id} photo={photo} />
      ))}
    </div>
  );
};

export default Gallery;
