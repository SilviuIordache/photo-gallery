import { useState, useEffect } from 'react';

const usePageSize = () => {
  const getPageSize = () => {
    const width = window.innerWidth;
    if (width < 576) return 'xs'; 
    if (width < 768) return 'sm'; 
    if (width < 992) return 'md';
    if (width < 1200) return 'lg'; 
    return 'xl';
  };

  const [pageSize, setPageSize] = useState(getPageSize());

  useEffect(() => {
    const handleResize = () => {
      setPageSize(getPageSize());
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return { pageSize, setPageSize };
};

export default usePageSize;
