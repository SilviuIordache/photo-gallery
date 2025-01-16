import { Photo } from 'pexels';
import { useEffect, useState } from 'react';
import GalleryImage from './GalleryImage';

interface GalleryGridProps {
  photos: Photo[];
}

const GalleryGrid = ({ photos }: GalleryGridProps) => {
  const [columns, setColumns] = useState(3);

  // used to update the number of columns based on the window size
  useEffect(() => {
    const updateColumns = () => {
      if (window.innerWidth < 600) {
        setColumns(1); // Small devices
      } else if (window.innerWidth < 1024) {
        setColumns(2); // Medium devices
      } else {
        setColumns(3); // Large devices
      }
    };

    // Set initial columns
    updateColumns();

    // Add event listener for window resize
    window.addEventListener('resize', updateColumns);

    // Cleanup event listener on component unmount
    return () => window.removeEventListener('resize', updateColumns);
  }, []);

  const generateColumnsContents = (photos: Photo[]) => {
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

  const columnContents = generateColumnsContents(photos);

  return (
    <div className="masonry-grid" style={{ columnCount: columns }}>
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
