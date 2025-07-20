import React from "react";

const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className="container mx-auto min-h-screen">{children}</div>;
};

export default DefaultLayout;
