import React from "react";
import { Form, Input, Button, Typography, Card, Divider } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

const { Title } = Typography;

const tailLayout = {
  wrapperCol: { offset: 0, span: 16 },
  width: 1000,
};

const componentLayout = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const SignIn: React.FC = () => {
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onClickSignUp = () => {
    console.log("Routing to SignUp page...");
  };

  return (
    <div className="site-card-border-less-wrapper" style={componentLayout}>
      <Card bordered={true} style={{ width: 450 }}>
        <Title level={4} style={componentLayout}>
          Sign in to application
        </Title>

        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your Username!" }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
          </Form.Item>
          <Divider>Or</Divider>

          <div style={componentLayout}>
            <Button type="link" onClick={onClickSignUp}>
              Sign Up
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default SignIn;
