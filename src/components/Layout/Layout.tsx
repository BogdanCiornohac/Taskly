import React from "react";
import Navbar from "../Navbar/Navbar.tsx";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="layout-container">
      <Navbar />
      <div className="main-page-container">{children}</div>
    </div>
  );
};

export default Layout;
