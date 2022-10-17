import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoutes from "../components/ProtectedRoutes/ProtectedRoutes";
import { BasicLayout } from "../layout/BasicLayout";
import {
  AddNurse,
  Nurses,
  EditNurse,
  Login,
  NotFound,
  Register,
} from "../pages";

type Props = {};

export const AppRoutes = (props: Props) => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="login" />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="/" element={<ProtectedRoutes />}>
        <Route path="/" element={<BasicLayout />}>
          <Route path="nurses/" element={<Nurses />} />
          <Route path="nurses/add-nurse" element={<AddNurse />} />
          <Route path="nurses/:id/edit-nurse" element={<EditNurse />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFound />}></Route>
    </Routes>
  );
};
