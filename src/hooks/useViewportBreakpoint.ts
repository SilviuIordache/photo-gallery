import { useEffect, useState } from 'react';

export type ViewportBreakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

const useViewportBreakpoint = () => {
  const [breakpoint, setBreakpoint] = useState<ViewportBreakpoint>('sm');

  useEffect(() => {
    const mqls = [
      { size: 'xs', mql: window.matchMedia('(max-width: 639px)') },
      { size: 'sm', mql: window.matchMedia('(min-width: 640px) and (max-width: 1023px)') },
      { size: 'md', mql: window.matchMedia('(min-width: 1024px) and (max-width: 1279px)') },
      { size: 'lg', mql: window.matchMedia('(min-width: 1280px) and (max-width: 1535px)') },
      { size: 'xl', mql: window.matchMedia('(min-width: 1536px)') },
    ];

    const checkMatch = () => {
      const matched = mqls.find(({ mql }) => mql.matches);
      if (matched) {
        setBreakpoint((prev) =>
          prev !== matched.size ? (matched.size as ViewportBreakpoint) : prev
        );
      }
    };

    mqls.forEach(({ mql }) => mql.addEventListener('change', checkMatch));

    // Initial check
    checkMatch();

    return () => {
      mqls.forEach(({ mql }) => mql.removeEventListener('change', checkMatch));
    };
  }, []);

  return breakpoint;
};

export default useViewportBreakpoint;
