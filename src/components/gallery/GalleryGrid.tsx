import { Photo } from 'pexels';
import { useState, useCallback, useEffect } from 'react';
import GalleryImage from './GalleryImage';
import useScreenBreakpoint from '../../hooks/useScreenBreakpoint';

interface GalleryGridProps {
  photos: Photo[];
}

const GalleryGrid = ({ photos }: GalleryGridProps) => {
  const [columnContents, setColumnContents] = useState<Photo[][]>([[], [], []]);
  const [columnCount, setColumnCount] = useState(3);

  const { breakpoint } = useScreenBreakpoint();

  const generateColumnsContents = useCallback(() => {
    // array that keeps track of the height of each column
    const columnHeights = new Array(columnCount).fill(0);

    // array of arrays that will contain the photos for each column
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
    setColumnCount(breakpoint === 'xs' ? 2 : 3);
  }, [breakpoint, generateColumnsContents]);

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
    </div>
  );
};

export default GalleryGrid;
