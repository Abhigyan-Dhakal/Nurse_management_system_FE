import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { Button, Form, Input } from "antd";

import {
  EMPTY_CONTACT,
  EMPTY_EMAIL,
  EMPTY_FIRST_NAME,
  EMPTY_LAST_NAME,
  EMPTY_PASSWORD,
  INVALID_EMAIL,
} from "../../constants/constants";

type Props = {};

export const RegisterForm = (props: Props) => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    const submittedData = {
      first_name: values.firstName,
      last_name: values.lastName,
      contact: values.contact,
      email: values.email,
      password: values.password,
    };

    await axios.post("/users", submittedData);

    form.resetFields();
    navigate("/login");
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Form
      form={form}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <div className="label">
        <p>First Name</p>
      </div>
      <Form.Item
        colon={false}
        name="firstName"
        rules={[{ required: true, message: EMPTY_FIRST_NAME }]}
      >
        <Input />
      </Form.Item>

      <div className="label">
        <p>Last Name</p>
      </div>
      <Form.Item
        colon={false}
        name="lastName"
        rules={[{ required: true, message: EMPTY_LAST_NAME }]}
      >
        <Input />
      </Form.Item>

      <div className="label">
        <p>Contact</p>
      </div>
      <Form.Item
        colon={false}
        name="contact"
        rules={[{ required: true, message: EMPTY_CONTACT }]}
      >
        <Input />
      </Form.Item>

      <div className="label">
        <p>Email</p>
      </div>
      <Form.Item
        colon={false}
        name="email"
        rules={[
          { required: true, message: EMPTY_EMAIL },
          { type: "email", message: INVALID_EMAIL },
        ]}
      >
        <Input />
      </Form.Item>

      <div className="label">
        <p>Password</p>
      </div>
      <Form.Item
        name="password"
        colon={false}
        rules={[{ required: true, message: EMPTY_PASSWORD }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item className="button--form-item">
        <Button type="primary" htmlType="submit" size="large" block>
          Register
        </Button>
      </Form.Item>
    </Form>
  );
};
