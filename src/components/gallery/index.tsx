import { useState, useEffect } from 'react';
import usePhotosQuery from '../../queries/usePhotosQuery';
import GalleryImage from './GalleryImage';
import type { PhotosWithTotalResults } from 'pexels';

const Gallery = () => {
  const [page, setPage] = useState(1);
  const [allPhotos, setAllPhotos] = useState<PhotosWithTotalResults['photos']>(
    []
  );

  const { data, isLoading, error } = usePhotosQuery({
    query: 'animals',
    per_page: 5,
    page: page,
  });

  useEffect(() => {
    if (data && 'photos' in data) {

      setAllPhotos((prevPhotos) => [...prevPhotos, ...data.photos]);
    }
  }, [data]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data || !('photos' in data)) return <div>No photos found</div>;

  const loadMoreImages = () => {
    console.log('Load more images button clicked');

    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div>
      <div className="masonry-grid">
        {allPhotos.map((photo) => (
          <GalleryImage key={photo.id} photo={photo} />
        ))}
      </div>

      <div className="flex justify-center">
        <button
          className="btn bg-blue-500 text-white hover:bg-blue-600 p-2 rounded-md mt-4"
          onClick={loadMoreImages}
        >
          Load more images
        </button>
      </div>
    </div>
  );
};

export default Gallery;
