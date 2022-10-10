import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
// import * as http from "../../axios/axios";

type Props = {};

export const RegisterForm = (props: Props) => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    const submittedData = {
      first_name: values.firstName,
      last_name: values.lastName,
      contact: values.contact,
      email: values.email,
      password: values.password,
    };

    // http.registerUser(submittedData);
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
        rules={[{ required: true, message: "Please enter your first name!" }]}
      >
        <Input />
      </Form.Item>

      <div className="label">
        <p>Last Name</p>
      </div>
      <Form.Item
        colon={false}
        name="lastName"
        rules={[{ required: true, message: "Please enter your last name!" }]}
      >
        <Input />
      </Form.Item>

      <div className="label">
        <p>Contact</p>
      </div>
      <Form.Item
        colon={false}
        name="contact"
        rules={[{ required: true, message: "Please enter your contact!" }]}
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
          { required: true, message: "Please input your email!" },
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
        rules={[{ required: true, message: "Please input your password!" }]}
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
