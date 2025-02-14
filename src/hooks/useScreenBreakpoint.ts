import { useState, useEffect } from 'react';

const getBreakpoint = () => {
  const width = window.innerWidth;
  if (width < 640) return 'xs';
  if (width < 1024) return 'sm';
  if (width < 1280) return 'md';
  if (width < 1536) return 'lg';
  return 'xl';
};

const useScreenBreakpoint = () => {
  const [breakpoint, setBreakpoint] = useState(getBreakpoint);

  useEffect(() => {
    const handleResize = () => {
      setBreakpoint(getBreakpoint);
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return breakpoint;
};

export default useScreenBreakpoint;
