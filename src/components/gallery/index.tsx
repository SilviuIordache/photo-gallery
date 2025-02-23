import { useState, useEffect, useCallback } from 'react';
import usePhotosQuery from '../../queries/usePhotosQuery';
import type { Photo, Photos, ErrorResponse } from 'pexels';
import LoadMoreTrigger from './LoadMoreTrigger';
import SearchInput from './SearchInput';
import GalleryGrid from './GalleryGrid';
import { useSearchParams } from 'react-router-dom';
import SkeletonGrid from './SkeletonGrid';

const Gallery = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('query') || '');
  const [page, setPage] = useState(1);
  const [allPhotos, setAllPhotos] = useState<Photo[]>([]);

  const [hasLoadedInitialPhotos, setHasLoadedInitialPhotos] = useState(false);

  const { data: photosResponse, error } = usePhotosQuery({
    query: query,
    per_page: 11,
    page: page,
  });

  const loadMoreImages = () => {
    setPage((prevPage) => prevPage + 1);
  };

  // used to update query state when user performs navigation from browser
  useEffect(() => {
    const newQuery = searchParams.get('query') || '';
    setQuery(newQuery);
    setPage(1);
  }, [searchParams]);

  // used to clear the photos when the query changes
  useEffect(() => {
    setAllPhotos([]);
    setHasLoadedInitialPhotos(false);
  }, [query]);

  const deduplicatePhotos = useCallback((photos: Photo[]) => {
    // Each photo is mapped by its id, ensuring uniqueness
    const photoMap = new Map(photos.map((photo) => [photo.id, photo]));

    // Extract the values from the Map, which are the unique photos
    const uniquePhotos = Array.from(photoMap.values());

    // Return the array of unique photos
    return uniquePhotos;
  }, []);

  const updatePhotos = useCallback(
    (photosResponse: Photos | ErrorResponse | undefined, page: number) => {
      if (photosResponse && 'photos' in photosResponse) {
        setAllPhotos((prevPhotos) =>
          deduplicatePhotos([...prevPhotos, ...photosResponse.photos])
        );

        if (page === 1) {
          setHasLoadedInitialPhotos(true);
        }
      }
    },
    [deduplicatePhotos]
  );

  useEffect(() => {
    updatePhotos(photosResponse, page);
  }, [photosResponse, page, updatePhotos]);

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

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="grid grid-cols-1">
      <div className="fixed top-0 left-0 bg-zinc-900 z-10 w-full py-5">
        <div className="flex justify-center">
          <SearchInput onSearch={handleSearch} initialQuery={query} />
        </div>
      </div>

      <div className="relative min-h-[540px]">
        <div className="mt-15">
          {!hasLoadedInitialPhotos ? (
            <SkeletonGrid />
          ) : (
            <GalleryGrid photos={allPhotos} />
          )}
        </div>

        <div style={{ height: '300px' }}>
          {allPhotos.length > 0 && (
            <LoadMoreTrigger loadMoreImages={loadMoreImages} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
