import React, { ReactNode } from "react";
import { Navbar } from "./Navbar";

interface LayoutProps {
  children: ReactNode;
  nav?: boolean;
  bgColor?: string;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  nav = true,
  bgColor = "bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]",
}: LayoutProps) => {
  return (
    <div className="overflow-x-hidden text-neutral-300 antialiased selection:bg-cyan-300 selection:text-cyan-900">
      <div className="fixed top-0 -z-10 h-full w-full">
        <div
          className={`absolute top-0 z-[-2] h-screen w-screen ${bgColor}`}
        ></div>
      </div>
      <div className="container mx-auto px-8">
        {nav && <Navbar />}
        {children}
      </div>
    </div>
  );
};
