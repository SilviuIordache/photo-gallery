import { Photo } from 'pexels';
import { useState, useCallback, useEffect } from 'react';
import GalleryImage from './GalleryImage';
import useScreenBreakpoint from '../../hooks/useScreenBreakpoint';

interface GalleryGridProps {
  photos: Photo[];
}

const GalleryGrid = ({ photos }: GalleryGridProps) => {
  const { breakpoint } = useScreenBreakpoint();
  
  // Determine column count based on breakpoint
  const columnCount = breakpoint === 'default' ? 2 : 3; // 'default' means before `sm:grid-cols-3`

  const generateColumnsContents = useCallback(() => {
    console.log('generateColumnsContents');
    const columnHeights = new Array(columnCount).fill(0);
    const columnContents: Photo[][] = Array.from({ length: columnCount }, () => []);

    photos.forEach((photo) => {
      const shortestColumnIndex = columnHeights.indexOf(Math.min(...columnHeights));
      columnContents[shortestColumnIndex].push(photo);
      columnHeights[shortestColumnIndex] += photo.height / photo.width;
    });

    return columnContents;
  }, [columnCount, photos]);

  const [columnContents, setColumnContents] = useState<Photo[][]>(generateColumnsContents);

  useEffect(() => {
    setColumnContents(generateColumnsContents());
  }, [breakpoint, generateColumnsContents]);

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
