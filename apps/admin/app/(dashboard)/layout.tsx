import React from "react";
import SideBar from "@/components/ui/sidebar";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <SideBar />
      {children}
    </div>
  );
}

export default Layout;
