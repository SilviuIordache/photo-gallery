import { useState, useEffect } from 'react';

const useScreenBreakpoint = () => {
  const getBreakpoint = () => {
    const width = window.innerWidth;
    if (width < 640) return 'default';
    if (width < 1024) return 'sm';
    if (width < 1280) return 'md';
    if (width < 1536) return 'lg';
    return 'xl';
  };

  const [breakpoint, setBreakpoint] = useState(getBreakpoint());

  useEffect(() => {
    const handleResize = () => {
      setBreakpoint(getBreakpoint());
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return { breakpoint };
};

export default useScreenBreakpoint;
