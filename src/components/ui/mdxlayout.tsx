import React from "react";

const MdxLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex flex-col gap-4 p-8">{children}</div>;
};

export default MdxLayout;
