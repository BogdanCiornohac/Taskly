import React from "react";
import "./NavTab.css";
import { Link } from "react-router-dom";

type NavTabProps = {
  title: string;
  navigateTo: string;
};

const NavTab: React.FC<NavTabProps> = ({ title, navigateTo }) => {
  return (
    <>
      <Link to={navigateTo}>
        <button className="nav-tab">{title}</button>
      </Link>
    </>
  );
};

export default NavTab;
