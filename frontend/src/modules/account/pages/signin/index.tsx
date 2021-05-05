import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Divider, Form, Input, Row, Typography } from "antd";
import React from "react";
import { useAccountMutation } from "../../../../common/services/generate/generate-types";
import store from "../../../../store";
import { setUser } from "../../../../store/reducers/users/actions";
import { useHistory } from "react-router-dom";
const { Title } = Typography;

const tailLayout = {
  width: 1000,
};

const componentLayout = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const SignIn: React.FC = () => {
  const history = useHistory();

  const [
    accountMutation,
    {
      data,
      //  loading,
      error,
    },
  ] = useAccountMutation({
    variables: {
      user: {
        email: "",
        password: "",
      },
    },
  });

  const onFinish = (values: any) => {
    console.log("Success:", values);
    accountMutation({ variables: { user: values } });
    console.log(data?.userLogin.displayName);
    console.log(error?.message);
    if (!error) store.dispatch(setUser(data));
    history.push("/");
  };

  const onClickSignUp = () => {
    history.push("/signup");
  };

  return (
    <Row justify="center" align="middle" style={{ minHeight: "100vh" }}>
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
              name="email"
              rules={[{ required: true, message: "Please input your Email!" }]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Email"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your Password!" },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>

            <Form.Item {...tailLayout}>
              <div style={{ textAlign: "center" }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                  Log in
                </Button>
              </div>
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
    </Row>
  );
};

export default SignIn;
