import React from "react";
import "./Backdrop.css";

type BackdropType = {
  children: React.ReactNode;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
  isActive: boolean;
};

const Backdrop: React.FC<BackdropType> = ({
  children,
  setIsActive,
  isActive,
}) => {
  return (
    <div
      className={isActive ? "backdrop active-backdrop" : "backdrop"}
      onClick={(prev) => setIsActive(!prev)}
    >
      {children}
    </div>
  );
};

export default Backdrop;
