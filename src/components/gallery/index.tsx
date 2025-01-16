import { useState, useEffect, useCallback } from 'react';
import usePhotosQuery from '../../queries/usePhotosQuery';
import type { PhotosWithTotalResults } from 'pexels';
import LoadMoreTrigger from './LoadMoreTrigger';
import SearchInput from './SearchInput';
import GalleryGrid from './GalleryGrid';
import { useSearchParams } from 'react-router-dom';

const Gallery = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('query') || '';
  const [query, setQuery] = useState(initialQuery);
  const [page, setPage] = useState(1);
  const [allPhotos, setAllPhotos] = useState<PhotosWithTotalResults['photos']>(
    []
  );
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [hasLoadedInitially, setHasLoadedInitially] = useState(false);
  const [loadCountdown, setLoadCountdown] = useState<number | null>(null);

  const { data, error } = usePhotosQuery({
    query: query,
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

  // used to clear the photos when the query changes
  useEffect(() => {
    setAllPhotos([]);
  }, [query]);

  // used to set the hasLoadedInitially state to true
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
      setSearchParams({ query });
    },
    [setSearchParams]
  );

  useEffect(() => {
    if (initialQuery) {
      handleSearch(initialQuery);
    }
  }, [handleSearch, initialQuery]);

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="grid grid-cols-1">
      <div>
        <h1 className="text-4xl font-bold text-left mb-10">Photo gallery</h1>

        <div className="flex flex-start mb-10">
          <SearchInput onSearch={handleSearch} />
        </div>
      </div>

      <div>
        <GalleryGrid photos={allPhotos} />

        <LoadMoreTrigger
          onInView={loadMoreImages}
          isFetchingMore={isFetchingMore}
          loadCountdown={loadCountdown}
        />
      </div>
    </div>
  );
};

export default Gallery;
