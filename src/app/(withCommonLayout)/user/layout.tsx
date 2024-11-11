import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="container mx-auto max-w-7xl flex-grow">{children}</div>
  );
};

export default layout;
