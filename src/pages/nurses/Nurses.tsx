import { Divider } from "antd";
import { NurseTable } from "../../components";

import "./Nurses.css";

type Props = {};
export const Nurses = (props: Props) => {
  return (
    <div className="nurses-container">
      <div>
        <h1 className="nurses-heading">All Nurses</h1>
      </div>
      <Divider />
      <div>
        <NurseTable />
      </div>
    </div>
  );
};
