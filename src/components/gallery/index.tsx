import { useState, useEffect } from 'react';
import usePhotosQuery from '../../queries/usePhotosQuery';
import GalleryImage from './GalleryImage';
import type { PhotosWithTotalResults, Photo } from 'pexels';

const Gallery = () => {
  const [page, setPage] = useState(1);
  const [allPhotos, setAllPhotos] = useState<PhotosWithTotalResults['photos']>(
    []
  );
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  const { data, error, isLoading } = usePhotosQuery({
    query: 'animals',
    per_page: 5,
    page: page,
  });

  useEffect(() => {
    if (data && 'photos' in data) {
      setAllPhotos((prevPhotos) => [...prevPhotos, ...data.photos]);
      setIsFetchingMore(false);
    }
  }, [data]);

  if (error) return <div>Error: {error.message}</div>;

  const loadMoreImages = () => {
    setIsFetchingMore(true);
    setPage((prevPage) => prevPage + 1);
  };

  const generateColumnsContents = (photos: Photo[]) => {
    const columns = 3;
    const columnHeights = new Array(columns).fill(0);
    const columnContents: Photo[][] = Array.from({ length: columns }, () => []);

    // distribute photos to columns based on their height/width ratio
    photos.forEach((photo) => {
      const shortestColumnIndex = columnHeights.indexOf(
        Math.min(...columnHeights)
      );
      columnContents[shortestColumnIndex].push(photo);
      columnHeights[shortestColumnIndex] += photo.height / photo.width;
    });

    return columnContents;
  };

  const columnContents = generateColumnsContents(allPhotos);

  return (
    <div>
      <div className="masonry-grid">
        {columnContents.map((column, index) => (
          <div key={index}>
            {column.map((photo) => (
              <GalleryImage key={photo.id} photo={photo} />
            ))}
          </div>
        ))}
      </div>

      {!isLoading && (
        <div className="flex justify-center">
          <button
            className="btn bg-blue-500 text-white hover:bg-blue-600 p-2 rounded-md mt-4 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-500"
            onClick={loadMoreImages}
            disabled={isFetchingMore}
          >
            {isFetchingMore ? 'Loading more images...' : 'Load more images'}
          </button>
        </div>
      )}
    </div>
  );
};

export default Gallery;
