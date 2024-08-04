import React from "react";
import "./SideDrawer.css";

type SideDrawerProps = {
  children: React.ReactNode;
};

const SideDrawer: React.FC<SideDrawerProps> = ({ children }) => {
  return (
    <div
      className="sidedrawer-container"
      onClick={(event) => event.stopPropagation()}
    >
      {children}
    </div>
  );
};

export default SideDrawer;
