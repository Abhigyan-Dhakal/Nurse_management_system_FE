import React from "react";
import { AddNurseForm } from "../../components";
import "./AddNurse.css";

type Props = {};

export const AddNurse = (props: Props) => {
  return (
    <div className="add-nurse-container">
      <div>
        <h1 className="add-nurse-heading">Add new Nurse details</h1>
      </div>
      <div>
        <AddNurseForm />
      </div>
    </div>
  );
};
