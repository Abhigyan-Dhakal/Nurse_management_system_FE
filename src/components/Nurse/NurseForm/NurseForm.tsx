import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";

import { UploadOutlined } from "@ant-design/icons";

import {
  Button,
  Form,
  Input,
  InputNumber,
  Switch,
  TimePicker,
  Upload,
} from "antd";
import { openNotification } from "../../common/notification";

import {
  EMPTY_ADDRESS,
  EMPTY_CONTACT_NO,
  EMPTY_DUTY_END_TIME,
  EMPTY_DUTY_START_TIME,
  EMPTY_IMAGE_UPLOAD,
  EMPTY_NURSE_NAME,
  EMPTY_WORKING_DAYS,
  INVALID_EMAIL,
  NURSE_ADDED_MESSAGE,
  NURSE_EDITED_MESSAGE,
} from "../../../constants/constants";

import "./NurseForm.css";

type Props = {};

export const AddNurseForm = (props: Props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();

  const [form] = Form.useForm();

  const [isAddForm, setIsAddForm] = useState<boolean | null>();

  useEffect(() => {
    if (location.pathname === "/nurses/add-nurse") {
      form.setFieldsValue({
        isRoundingManager: false,
      });
      setIsAddForm(true);
    } else {
      (async () => {
        const nurseId = params.id;
        const res = await axios.get(`/nurses/${nurseId}`);
        const nurseData = res.data.data;

        const startTime = new Date(nurseData.dutyStartTime);
        const endTime = new Date(nurseData.dutyEndTime);

        form.setFieldsValue({
          name: nurseData.name,
          email: nurseData.email,
          workingDays: nurseData.workingDays,
          dutyStartTime: moment(
            moment(startTime).format("HH:mm:ss"),
            "HH:mm:ss"
          ),
          dutyEndTime: moment(moment(endTime).format("HH:mm:ss"), "HH:mm:ss"),
          address: nurseData.address,
          contact: nurseData.contact,
          isRoundingManager: nurseData.isRoundingManager,
        });
      })();

      setIsAddForm(false);
    }
  }, [form, location.pathname, params.id]);

  function onProfileUpload(info: any) {
    console.log("Done");
  }

  const onFinish = async (values: any) => {
    const formData = new FormData();

    formData.append("name", values.name);
    formData.append("isRoundingManager", values.isRoundingManager);
    formData.append("workingDays", values.workingDays);
    formData.append("dutyStartTime", values.dutyStartTime);
    formData.append("dutyEndTime", values.dutyEndTime);
    formData.append("address", values.address);
    formData.append("email", values.email);
    formData.append("contact", values.contact);

    if (isAddForm) {
      formData.append("photograph", values.picture.file.originFileObj);
      try {
        await axios.post("/nurses", formData, {
          headers: {
            "content-type": "multipart/form-data",
          },
        });
        openNotification(NURSE_ADDED_MESSAGE);
      } catch (err) {
        console.log(err);
      }
    } else {
      values.picture?.file.originFileObj &&
        formData.append("photograph", values.picture.file.originFileObj);
      try {
        await axios.put(`/nurses/${params.id}`, formData, {
          headers: {
            "content-type": "multipart/form-data",
          },
        });
        openNotification(NURSE_EDITED_MESSAGE);
      } catch (err) {
        console.log(err);
      }
    }

    navigate("/nurses");
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      form={form}
    >
      <div>
        <p className="form-label">
          Name <span className="compulsory">*</span>
        </p>
      </div>
      <Form.Item
        colon={false}
        name="name"
        rules={[{ required: true, message: EMPTY_NURSE_NAME }]}
      >
        <Input />
      </Form.Item>

      <div>
        <p className="form-label">Email</p>
      </div>
      <Form.Item
        colon={false}
        name="email"
        rules={[{ type: "email", message: INVALID_EMAIL }]}
      >
        <Input />
      </Form.Item>

      <div>
        <p className="form-label">
          Working Days <span className="compulsory">*</span>
        </p>
      </div>
      <Form.Item
        colon={false}
        name="workingDays"
        rules={[{ required: true, message: EMPTY_WORKING_DAYS }]}
      >
        <InputNumber min={1} max={30} style={{ width: "100%" }} />
      </Form.Item>

      <div>
        <p className="form-label">
          Duty Start Time <span className="compulsory">*</span>
        </p>
      </div>
      <Form.Item
        colon={false}
        name="dutyStartTime"
        rules={[{ required: true, message: EMPTY_DUTY_START_TIME }]}
      >
        <TimePicker style={{ width: "100%" }} />
      </Form.Item>

      <div>
        <p className="form-label">
          Duty End Time <span className="compulsory">*</span>
        </p>
      </div>
      <Form.Item
        colon={false}
        name="dutyEndTime"
        rules={[{ required: true, message: EMPTY_DUTY_END_TIME }]}
      >
        <TimePicker
          defaultOpenValue={moment("00:00:00", "HH:mm:ss")}
          style={{ width: "100%" }}
        />
      </Form.Item>

      <div>
        <p className="form-label">
          Address <span className="compulsory">*</span>
        </p>
      </div>
      <Form.Item
        colon={false}
        name="address"
        rules={[{ required: true, message: EMPTY_ADDRESS }]}
      >
        <Input />
      </Form.Item>

      <div>
        <p className="form-label">
          Contact <span className="compulsory">*</span>
        </p>
      </div>
      <Form.Item
        colon={false}
        name="contact"
        rules={[{ required: true, message: EMPTY_CONTACT_NO }]}
      >
        <Input type="number" />
      </Form.Item>

      <div>
        <p className="form-label">Rounding Manager</p>
      </div>
      <Form.Item name="isRoundingManager" valuePropName="checked">
        <Switch checked={false} />
      </Form.Item>
      <div>
        <p className="form-label">
          Picture {isAddForm ? <span className="compulsory">*</span> : ""}
        </p>
      </div>
      <Form.Item
        name="picture"
        rules={[
          isAddForm
            ? { required: true, message: EMPTY_IMAGE_UPLOAD }
            : { required: false },
        ]}
      >
        <Upload maxCount={1} onChange={onProfileUpload}>
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
      </Form.Item>
      <Form.Item className="button--form-item">
        <Button type="primary" htmlType="submit" size="large" block>
          {isAddForm ? "Add Nurse" : "Edit Nurse"}
        </Button>
      </Form.Item>
    </Form>
  );
};
