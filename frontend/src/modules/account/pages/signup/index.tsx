import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, Row, Space } from "antd";
import Title from "antd/lib/typography/Title";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useCreateAccountMutation } from "../../../../common/services/generate/generate-types";
import { setUser } from "../../../../common/store/user";
import ErrorBadge from "./ErrorBadge";
const tailLayout = {
  width: 1000,
};

const componentLayout = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const AccountSignUpPage: React.FC<{
  onError?: (status: number) => void;
}> = (props) => {
  const [
    createAccountMutation,
    { data, loading, error },
  ] = useCreateAccountMutation({
    errorPolicy: "all",
  });
  const history = useHistory();
  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const [statusError, setStatusError] = useState(0);

  useEffect(() => {
    if (!error && data) {
      dispatch(setUser(data.createAccount));
      history.push("/");
    } else {
      setStatusError(error?.graphQLErrors[0].extensions?.exception.status);
    }
  }, [data, loading, error, history, dispatch]);

  const onFinish = (values: any) => {
    createAccountMutation({
      variables: {
        user: {
          displayName: values.username,
          username: values.username,
          email: values.email,
          password: values.password,
        },
      },
    });
  };

  const onClickSignIn = () => {
    history.push("/signin");
  };

  const validatePassword = (_: any, value: string) => {
    if (!value || form.getFieldValue("password") === value) {
      return Promise.resolve();
    }
    return Promise.reject(
      new Error("The two passwords that you entered do not match!")
    );
  };

  props.onError && props.onError(statusError);
  return (
    <Row justify="center" align="middle" style={{ minHeight: "100vh" }}>
      <div className="site-card-border-less-wrapper" style={componentLayout}>
        <Card bordered={true} style={{ width: 450, textAlign: "center" }}>
          <ErrorBadge statusError={statusError} />
          <Title level={4} style={componentLayout}>
            Sign up for your account
          </Title>
          <Row style={{ marginBottom: 16 }}></Row>
          <Form
            form={form}
            name="register"
            layout="horizontal"
            scrollToFirstError
            onFinish={onFinish}
          >
            <Form.Item
              name="email"
              rules={[
                {
                  type: "email",
                  message: "The input is not a valid E-mail",
                },
                {
                  required: true,
                  message: "Please input your Email",
                },
              ]}
            >
              <Input
                prefix={<MailOutlined className="site-form-item-icon" />}
                placeholder="Enter email address"
              />
            </Form.Item>
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your Username",
                },
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="Enter Username" />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your Password",
                },
                {
                  min: 6,
                  message:
                    "Password must be longer than or equal to 6 characters",
                },
              ]}
              hasFeedback
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Enter Password"
              />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please input your Username",
                },
                {
                  validator: validatePassword,
                },
              ]}
            >
              <Input.Password placeholder="Re-enter password" />
            </Form.Item>

            <Space align="center">
              <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                  Register
                </Button>
              </Form.Item>
            </Space>
          </Form>
          <div>
            Already have an account?
            <Button type="link" size="small" onClick={onClickSignIn}>
              Sign In
            </Button>
          </div>
        </Card>
      </div>
    </Row>
  );
};

export default AccountSignUpPage;
