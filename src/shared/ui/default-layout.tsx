import React from "react";

const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className="container mx-auto">{children}</div>;
};

export default DefaultLayout;
