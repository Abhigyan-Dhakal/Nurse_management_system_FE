import { Button, Form, Input } from "antd";
import "./LoginForm.css";
// import * as http from "../../axios/axios";
import { useNavigate } from "react-router-dom";
import { openNotification } from "../common/notification";
import {
  BAD_REQ_MESSAGE,
  INVALID_CREDENTIALS_MESSAGE,
  LOGGED_IN_MESSAGE,
} from "../../constants/constants";
import axios from "axios";
import { setDataToLocalStorage } from "../../utils/handleToken";

type Props = {};

export const LoginForm = (props: Props) => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    try {
      const res: any = await axios.post("/login", values);
      const data = res.data.data;
      if (data) {
        setDataToLocalStorage(data.access, data.refresh, "true", data.user_id);
        navigate("/nurses");
        form.resetFields();
        openNotification(LOGGED_IN_MESSAGE);
      } else {
        openNotification(INVALID_CREDENTIALS_MESSAGE);
        form.resetFields();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
    openNotification(BAD_REQ_MESSAGE);
  };

  return (
    <Form
      name="basic"
      initialValues={{ remember: true }}
      form={form}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <div className="label">
        <p>Email</p>
      </div>
      <Form.Item
        colon={false}
        name="email"
        rules={[
          { required: true, message: "Please enter your email!" },
          { type: "email", message: "Please enter valid email!" },
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
        rules={[{ required: true, message: "Please enter your password!" }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item className="button--form-item">
        <Button type="primary" htmlType="submit" size="large" block>
          Login
        </Button>
      </Form.Item>
    </Form>
  );
};
