import React, { useState } from "react";
import { BiTask } from "react-icons/bi";
import "./Navbar.css";
import NavTab from "./NavTab";
import { tabsData } from "../data/tabsData";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  const [isActive, setIsActive] = useState(false);

  return (
    <nav className="navbar-container">
      <Link to="/home">
        <div className="logo">
          <BiTask size={"30px"} />
          <h1>Taskly</h1>
        </div>
      </Link>
      <div className="tabs-container">
        {tabsData.map(({ title, navigateTo }, index) => (
          <NavTab title={title} navigateTo={navigateTo} key={index} />
        ))}
        <div className="add-task-container">
          <div className="right-plus" />
          <div className="left-plus" />
        </div>
        <div className="circle-profile"></div>
      </div>
      <div
        className={isActive ? "burger active" : "burger"}
        onClick={() => setIsActive(!isActive)}
      >
        <span className="slice"></span>
        <span className="slice"></span>
        <span className="slice"></span>
      </div>
    </nav>
  );
};

export default Navbar;
