import { useState, useEffect } from 'react';

const useScreenBreakpoint = () => {
  const getBreakpoint = () => {
    const width = window.innerWidth;
    if (width < 576) return 'xs';
    if (width < 768) return 'sm';
    if (width < 992) return 'md';
    if (width < 1200) return 'lg';
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
