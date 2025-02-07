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
  const [query, setQuery] = useState(searchParams.get('query') || '');
  const [page, setPage] = useState(1);
  const [allPhotos, setAllPhotos] = useState<PhotosWithTotalResults['photos']>(
    []
  );

  const [hasLoadedInitialPhotos, setHasLoadedInitialPhotos] = useState(false);

  const { data: photosResponse, error } = usePhotosQuery({
    query: query,
    per_page: 11,
    page: page,
  });

  const loadMoreImages = () => {
    setPage((prevPage) => prevPage + 1);
  };

  // used to clear the photos when the query changes
  useEffect(() => {
    setAllPhotos([]);
  }, [query]);

  // used to update the photos after loading more
  useEffect(() => {
    if (photosResponse && 'photos' in photosResponse) {
      setAllPhotos((prevPhotos) => [...prevPhotos, ...photosResponse.photos]);

      // Set hasLoadedInitialPhotos to true after the first load
      if (page === 1) {
        setHasLoadedInitialPhotos(true);
      }
    }
  }, [photosResponse, page]);

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
          <SearchInput onSearch={handleSearch} />
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

        {allPhotos.length > 0 && (
          <LoadMoreTrigger
            loadMoreImages={loadMoreImages}
          />
        )}
      </div>
    </div>
  );
};

export default Gallery;
