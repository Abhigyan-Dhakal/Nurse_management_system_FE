import React from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "../components";
import "./BasicLayout.css";

export const BasicLayout: React.FC = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};
