import { useEffect, useState } from 'react';

export type ViewportBreakpoint = 'sm' | 'md' | 'lg' | 'xl';

const useViewportBreakpoint = () => {
  const [viewportBreakpoint, setViewportBreakpoint] =
    useState<ViewportBreakpoint>('sm');

  useEffect(() => {
    const mqls = [
      { size: 'sm', mql: window.matchMedia('(max-width: 767px)') },
      {
        size: 'md',
        mql: window.matchMedia('(min-width: 768px) and (max-width: 1023px)'),
      },
      {
        size: 'lg',
        mql: window.matchMedia('(min-width: 1024px) and (max-width: 1199px)'),
      },
      { size: 'xl', mql: window.matchMedia('(min-width: 1200px)') },
    ];

    const checkMatch = () => {
      const matched = mqls.find(({ mql }) => mql.matches);
      if (matched) {
        setViewportBreakpoint((prev) =>
          prev !== matched.size ? (matched.size as ViewportBreakpoint) : prev
        );
      }
    };

    mqls.forEach(({ mql }) => mql.addEventListener('change', checkMatch));
    checkMatch(); // Initial check

    return () => {
      mqls.forEach(({ mql }) => mql.removeEventListener('change', checkMatch));
    };
  }, []);

  return viewportBreakpoint;
};

export default useViewportBreakpoint;
