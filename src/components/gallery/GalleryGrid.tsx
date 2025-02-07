import { Photo } from 'pexels';
import { useEffect, useState, useCallback } from 'react';
import GalleryImage from './GalleryImage';
import SkeletonGrid from './SkeletonGrid';
import usePageSize from '../../hooks/usePageSize';

interface GalleryGridProps {
  isLoadingMore: boolean;
  photos: Photo[];
}

const GalleryGrid = ({ photos, isLoadingMore }: GalleryGridProps) => {
  const [columnContents, setColumnContents] = useState<Photo[][]>([]);
  const [columnCount, setColumnCount] = useState(3);

  const { pageSize } = usePageSize();

  const generateColumnsContents = useCallback(() => {
    const columnHeights = new Array(columnCount).fill(0);
    const columnContents: Photo[][] = Array.from(
      { length: columnCount },
      () => []
    );

    photos.forEach((photo) => {
      const shortestColumnIndex = columnHeights.indexOf(
        Math.min(...columnHeights)
      );
      columnContents[shortestColumnIndex].push(photo);
      columnHeights[shortestColumnIndex] += photo.height / photo.width;
    });

    return columnContents;
  }, [columnCount, photos]);

  useEffect(() => {
    const newColumnContents = generateColumnsContents();
    setColumnContents(newColumnContents);

    setColumnCount(pageSize === 'xs' ? 2 : 3);
  }, [pageSize, generateColumnsContents]);

  return (
    <div
      className="grid grid-cols-2 sm:grid-cols-3 gap-6"
      style={{ columnCount }}
    >
      {columnContents.map((column, index) => (
        <div key={index}>
          {column.map((photo) => (
            <GalleryImage key={photo.id} photo={photo} />
          ))}
        </div>
      ))}

      {isLoadingMore && <SkeletonGrid />}
    </div>
  );
};

export default GalleryGrid;
