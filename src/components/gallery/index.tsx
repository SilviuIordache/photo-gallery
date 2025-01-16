import { useState, useEffect, useCallback } from 'react';
import usePhotosQuery from '../../queries/usePhotosQuery';
import type { PhotosWithTotalResults } from 'pexels';
import LoadMoreTrigger from './LoadMoreTrigger';
import SearchInput from './SearchInput';
import GalleryGrid from './GalleryGrid';

const Gallery = () => {
  const [page, setPage] = useState(1);
  const [allPhotos, setAllPhotos] = useState<PhotosWithTotalResults['photos']>(
    []
  );
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [hasLoadedInitially, setHasLoadedInitially] = useState(false);
  const [loadCountdown, setLoadCountdown] = useState<number | null>(null);

  const { data, error } = usePhotosQuery({
    query: 'animals',
    per_page: 9,
    page: page,
  });

  const loadMoreImages = useCallback(() => {
    if (loadCountdown !== null) return;

    setIsFetchingMore(true);
    setPage((prevPage) => prevPage + 1);
    setLoadCountdown(3);

    const timer = setTimeout(() => {
      setLoadCountdown(null);
    }, 3000);

    return () => clearTimeout(timer);
  }, [loadCountdown]);

  // used to clear the photos when the page is loaded
  useEffect(() => {
    setAllPhotos([]);
  }, []);

  // flag to check if the page has loaded initially
  useEffect(() => {
    if (!hasLoadedInitially) {
      setHasLoadedInitially(true);
    }
  }, [hasLoadedInitially]);

  // used to update the photos after loading more
  useEffect(() => {
    if (data && 'photos' in data) {
      setAllPhotos((prevPhotos) => [...prevPhotos, ...data.photos]);
      setIsFetchingMore(false);
    }
  }, [data]);

  useEffect(() => {
    if (loadCountdown === null) return;

    const interval = setInterval(() => {
      setLoadCountdown((prevCountdown) => {
        if (prevCountdown === 1) {
          clearInterval(interval);
          return null;
        }
        return prevCountdown! - 1;
      });
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [loadCountdown]);

  if (error) return <div>Error: {error.message}</div>;

  const handleSearch = (query: string) => {
    console.log(query);
  };

  return (
    <div>
      <h1 className="text-4xl font-bold text-left mb-10">Photo gallery</h1>

      <div className="flex flex-start mb-10">
        <SearchInput onSearch={handleSearch} />
      </div>

      <GalleryGrid photos={allPhotos} />

      <LoadMoreTrigger
        onInView={loadMoreImages}
        isFetchingMore={isFetchingMore}
        loadCountdown={loadCountdown}
      />

      {/* {hasLoadedInitially && (
        <div className="flex justify-center">
          <button
            className="btn bg-blue-500 text-white hover:bg-blue-600 p-2 rounded-md mt-4 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-500"
            onClick={loadMoreImages}
            disabled={isFetchingMore}
          >
            {isFetchingMore ? 'Loading more images...' : 'Load more images'}
          </button>
        </div>
      )} */}
    </div>
  );
};

export default Gallery;
