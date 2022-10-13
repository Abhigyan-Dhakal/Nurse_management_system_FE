import React from "react";
import { NavLink } from "react-router-dom";
import { removeDataFromLocalStorage } from "../../utils/handleToken";

type Props = {};

export const Navbar = (props: Props) => {
  const Styling = (prop: { isActive: boolean }) => {
    const { isActive } = prop;
    return { color: isActive ? "#176bb9" : "gray" };
  };

  const handleClick = () => {
    removeDataFromLocalStorage();
  };

  return (
    <div className="navbar">
      <div>
        <h1 className="logo">Nurse Management System</h1>
      </div>
      <div className="nav-items">
        <NavLink
          style={Styling}
          to={"/nurses/add-nurse"}
          className="add-nurse-btn"
        >
          Add Nurse
        </NavLink>
        <NavLink style={Styling} to={"/nurses"}>
          Nurses
        </NavLink>
        <NavLink style={Styling} to="/login" onClick={handleClick}>
          Logout
        </NavLink>
      </div>
    </div>
  );
};
