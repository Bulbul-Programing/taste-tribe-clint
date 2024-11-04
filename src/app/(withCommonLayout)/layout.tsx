import { ReactNode } from "react";

import { Navbar } from "@/src/components/UI/navbar";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="container mx-auto max-w-7xl px-6 flex-grow">
      <Navbar />
      {children}
    </div>
  );
};

export default layout;