import { Photo } from 'pexels';
import { useMemo } from 'react';
import useViewportBreakpoint from '../../hooks/useViewportBreakpoint';
import GalleryImage from './GalleryImage';

interface GalleryGridProps {
  photos: Photo[];
}

const GalleryGrid = ({ photos }: GalleryGridProps) => {
  const breakpoint = useViewportBreakpoint();
  const columnCount = breakpoint === 'xs' ? 2 : 3;

  const columnContents = useMemo(() => {
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

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
      {columnContents.map((column, index) => (
        <div key={index}>
          {column.map((photo) => (
            <GalleryImage key={photo.id} photo={photo} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default GalleryGrid;
