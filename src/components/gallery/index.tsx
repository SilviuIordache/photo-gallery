import { useState, useEffect, useCallback } from 'react';
import usePhotosQuery from '../../queries/usePhotosQuery';
import type { PhotosWithTotalResults } from 'pexels';
import LoadMoreTrigger from './LoadMoreTrigger';
import SearchInput from './SearchInput';
import GalleryGrid from './GalleryGrid';
import { useSearchParams } from 'react-router-dom';
import SkeletonGrid from './SkeletonGrid';

const Gallery = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('query') || '';
  const [query, setQuery] = useState(initialQuery);
  const [page, setPage] = useState(1);
  const [allPhotos, setAllPhotos] = useState<PhotosWithTotalResults['photos']>(
    []
  );
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [loadCountdown, setLoadCountdown] = useState<number | null>(3);
  const [showSkeletonLoader, setShowSkeletonLoader] = useState(true);

  const {
    data: photosResponse,
    error,
    isLoading: isLoadingPhotos,
  } = usePhotosQuery({
    query: query,
    per_page: 11,
    page: page,
  });

  const loadMoreImages = useCallback(() => {
    if (loadCountdown !== null) return;

    setIsFetchingMore(true);
    setPage((prevPage) => prevPage + 1);
    setLoadCountdown(3);
  }, [loadCountdown]);

  // used to clear the photos when the query changes
  useEffect(() => {
    setAllPhotos([]);
  }, [query]);

  // used to update the photos after loading more
  useEffect(() => {
    if (photosResponse && 'photos' in photosResponse) {
      setAllPhotos((prevPhotos) => [...prevPhotos, ...photosResponse.photos]);
      setIsFetchingMore(false);
    }
  }, [photosResponse]);

  // used to update the loadCountdown state
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

    return () => clearInterval(interval);
  }, [loadCountdown]);

  const handleSearch = useCallback(
    (query: string) => {
      setQuery(query);
      setPage(1);

      if (query) {
        setSearchParams({ query });
      } else {
        setSearchParams({});
      }
    },
    [setSearchParams]
  );

  // used to handle the initial query
  useEffect(() => {
    if (initialQuery) {
      handleSearch(initialQuery);
    }
  }, [handleSearch, initialQuery]);

  useEffect(() => {
    if (!isLoadingPhotos) {
      const timer = setTimeout(() => {
        setShowSkeletonLoader(false);
      }, 1000); // Adjust the delay as needed

      return () => clearTimeout(timer);
    } else {
      setShowSkeletonLoader(true);
    }
  }, [isLoadingPhotos]);

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="grid grid-cols-1">
      <div className="fixed top-0 left-0 bg-zinc-900 z-10 w-full py-5">

        <div className="flex justify-center">
          <SearchInput onSearch={handleSearch} />
        </div>
      </div>

      <div className="relative min-h-[540px]">
        {!allPhotos.length && !isFetchingMore && (
          <div className="absolute inset-0 flex items-center justify-center text-lg text-gray-500">
            Loading images...
          </div>
        )}

        <div className="mt-15">
          {showSkeletonLoader ? (
            <SkeletonGrid />
          ) : (
            <GalleryGrid photos={allPhotos} />
          )}
        </div>

        {allPhotos.length > 0 && (
          <LoadMoreTrigger
            onInView={loadMoreImages}
            isFetchingMore={isFetchingMore}
            loadCountdown={loadCountdown}
          />
        )}
      </div>
    </div>
  );
};

export default Gallery;
