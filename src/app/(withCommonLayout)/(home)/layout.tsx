import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="container mx-auto max-w-7xl py-5 flex-grow">{children}</div>
  );
};

export default layout;
