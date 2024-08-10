import React, { useState } from "react";
import { BiTask } from "react-icons/bi";
import "./Navbar.css";
import NavTab from "../NavTab/NavTab";
import { tabsData, sidedrawerTabsData } from "../../data/tabsData";
import { Link } from "react-router-dom";
import Backdrop from "../Backdrop/Backdrop";
import SideDrawer from "../SideDrawer/SideDrawer";
import TaskModal from "../AddTaskModal/TaskModal";

const Navbar: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <nav className="navbar-container">
      {isActive && (
        <Backdrop setIsActive={setIsActive} isActive={isActive}>
          <SideDrawer>
            {sidedrawerTabsData.map(({ title, navigateTo }, index) => (
              <NavTab key={index} navigateTo={navigateTo} title={title} />
            ))}
          </SideDrawer>
        </Backdrop>
      )}
      <Link to="/dashboard">
        <div className="logo">
          <BiTask size={"30px"} />
          <h1>Taskly</h1>
        </div>
      </Link>
      <div className="tabs-container">
        {tabsData.map(({ title, navigateTo }, index) => (
          <NavTab title={title} navigateTo={navigateTo} key={index} />
        ))}
        <div
          className="add-task-container"
          onClick={() => setShowAddModal(!showAddModal)}
        >
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
      <TaskModal
        type="add"
        title="Add new task"
        description=""
        setShowAddModal={setShowAddModal}
        showAddModal={showAddModal}
        priority="Low"
      />
    </nav>
  );
};

export default Navbar;
