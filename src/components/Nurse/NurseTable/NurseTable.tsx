import { Space, Table } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNurseData } from "../../../redux/slices/nurseSlice";
import { RootState } from "../../../redux";
import { Link } from "react-router-dom";
import { StarFilled, StarOutlined } from "@ant-design/icons";
// import { sortContact } from "../../../utils/sortContact";
import { Nurse } from "../../../domain/Nurse";
// import * as http from "../../../axios/axios";
import "./NurseTable.css";
import { openNotification } from "../../common/notification";
import { NURSE_DEL_MESSAGE } from "../../../constants/constants";
import { sortNurses } from "../../../utils/sortNurses";
import axios from "axios";

const { Column } = Table;

type Props = {};

export const NurseTable = (props: Props) => {
  const dispatch = useDispatch();

  const [dataDeletion, setDataDeletion] = useState<boolean>(true);
  const [roundingManager, setRoundingManager] = useState<boolean>(true);

  const nurses = useSelector((state: RootState) => state.nurseReducer.data);

  let data = nurses.map((nurse: any) => {
    const dataObj = {
      key: nurse.nurse_id,
      image: nurse.photograph,
      name: nurse.name,
      email: nurse.email,
      workingDays: nurse.workingDays,
      dutyStartTime: nurse.dutyStartTime,
      dutyEndTime: nurse.dutyEndTime,
      roundingManager: nurse.isRoundingManager,
      address: nurse.address,
      contact: nurse.contact,
    };

    return dataObj;
  });

  useEffect(() => {
    getNurseData();
    // if (dataDeletion) {
    //   (async () => {
    //     // let arrData = await axios.get("/nurses");
    //     // const sortedNurses = sortNurses(arrData.data.data);
    //     // dispatch(setNurseData(sortedNurses));
    //     // setDataDeletion(false);
    //     // setRoundingManager(false);
    //   })();
    //   console.log("Use effect ran");
    // }
  }, []);

  const getNurseData = async () => {
    let arrData = await axios.get("/nurses");
    const sortedNurses = sortNurses(arrData.data.data);
    dispatch(setNurseData(sortedNurses));
  };

  const handleDelete = async (key: number) => {};

  const handleRoundingManager = async (favourite: boolean, object: any) => {
    try {
      console.log("this ran");
      setRoundingManager((prev: boolean) => !prev);
      const formData = new FormData();
      formData.append("isRoundingManager", !object.roundingManager + "");
      await axios.put(`/nurses/${object.key}`, formData, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      });

      getNurseData();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Table dataSource={data} pagination={false}>
        <Column
          title=""
          dataIndex="roundingManager"
          key="key"
          render={(roundingManager: boolean, object: Nurse, index) => {
            return (
              <div
                className="favourite-container"
                onClick={() => handleRoundingManager(roundingManager, object)}
              >
                {roundingManager ? (
                  <StarFilled style={{ color: "orange" }} />
                ) : (
                  <StarOutlined />
                )}
              </div>
            );
          }}
        />

        <Column
          title=""
          dataIndex="image"
          key="image"
          render={(pic) => (
            <img src={pic} alt={pic + ""} className="profile-img" />
          )}
        />

        <Column title="Name" dataIndex="name" key="firstName" />
        <Column title="Email" dataIndex="email" key="email" />
        <Column title="Work Number" dataIndex="workNo" key="workNo" />
        <Column title="Home Number" dataIndex="homeNo" key="homeNo" />
        <Column title="Mobile Number" dataIndex="mobileNo" key="mobileNo" />

        <Column
          title="Action"
          key="action"
          dataIndex="key"
          render={(key) => (
            <Space size="small">
              <Link to={`${key}/edit-contact`}>
                <a className="edit-link">Edit</a>
              </Link>

              <a
                className="delete-link"
                onClick={() => {
                  handleDelete(key);
                }}
              >
                Delete
              </a>
            </Space>
          )}
        />
      </Table>
    </div>
  );
};
