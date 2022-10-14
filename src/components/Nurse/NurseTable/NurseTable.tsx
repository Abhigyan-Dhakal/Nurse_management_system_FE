import axios from "axios";
import moment from "moment";
import { Space, Table } from "antd";
import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { StarFilled, StarOutlined } from "@ant-design/icons";

import { openNotification } from "../../common/notification";

import { Nurse } from "../../../domain/Nurse";

import { RootState } from "../../../redux";
import { setNurseData } from "../../../redux/slices/nurseSlice";

import { NURSE_DEL_MESSAGE } from "../../../constants/constants";

import { sortNurses } from "../../../utils/sortNurses";

import "./NurseTable.css";

const { Column } = Table;

type Props = {};

export const NurseTable = (props: Props) => {
  const dispatch = useDispatch();

  const nurses = useSelector((state: RootState) => state.nurseReducer.data);

  let data = nurses.map((nurse: any) => {
    const dataObj = {
      key: nurse.nurse_id,
      image: nurse.photograph,
      name: nurse.name,
      email: nurse.email,
      workingDays: nurse.workingDays,
      dutyStartTime: moment(nurse.dutyStartTime).format("LT"),
      dutyEndTime: moment(nurse.dutyEndTime).format("LT"),
      roundingManager: nurse.isRoundingManager,
      address: nurse.address,
      contact: nurse.contact,
    };

    return dataObj;
  });

  useEffect(() => {
    getNurseData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getNurseData = async () => {
    let arrData = await axios.get("/nurses");
    const sortedNurses = sortNurses(arrData.data.data);
    dispatch(setNurseData(sortedNurses));
  };

  const handleDelete = async (key: number) => {
    await axios.delete(`/nurses/${key}`);
    openNotification(NURSE_DEL_MESSAGE);
    getNurseData();
  };

  const handleRoundingManager = async (favourite: boolean, object: any) => {
    try {
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
          title="Rounding Manager"
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
        <Column title="Working Days" dataIndex="workingDays" key="workNo" />
        <Column
          title="Duty Start Time"
          dataIndex="dutyStartTime"
          key="homeNo"
        />
        <Column title="Duty End Time" dataIndex="dutyEndTime" key="mobileNo" />
        <Column title="Address" dataIndex="address" key="address" />
        <Column title="Contact" dataIndex="contact" key="contact" />

        <Column
          title="Action"
          key="action"
          dataIndex="key"
          render={(key) => (
            <Space size="small">
              <Link to={`${key}/edit-nurse`}>
                <div className="edit-link">Edit</div>
              </Link>

              <div
                className="delete-link"
                onClick={() => {
                  handleDelete(key);
                }}
              >
                Delete
              </div>
            </Space>
          )}
        />
      </Table>
    </div>
  );
};
