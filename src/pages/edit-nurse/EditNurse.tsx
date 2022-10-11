import { AddNurseForm } from "../../components";
import "./EditNurse.css";

type Props = {};

export const EditNurse = (props: Props) => {
  return (
    <div className="edit-nurse-container">
      <div>
        <h1 className="edit-nurse-heading">Edit Nurse Details</h1>
      </div>
      <div>
        <AddNurseForm />
      </div>
    </div>
  );
};
