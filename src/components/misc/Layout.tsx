import React from 'react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="pt-16">{children}</div>;
};

export default Layout;
