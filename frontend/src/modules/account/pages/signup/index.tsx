import {
  LockOutlined, MailOutlined,


  SmileOutlined, UserOutlined
} from "@ant-design/icons";
import { Alert, Button, Card, Form, Input, Row, Space } from "antd";
import Title from "antd/lib/typography/Title";
import React from "react";
import { useCreateAccountMutation } from "../../../../common/services/generate/generate-types";
const tailLayout = {
  width: 1000,
};

const componentLayout = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const AccountSignUpPage: React.FC = () => {
  const [createAccountMutation, { error }] = useCreateAccountMutation({
    errorPolicy: "all",
  });
  const [form] = Form.useForm();

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
  let statusError = 0;
  statusError = error?.graphQLErrors[0].extensions?.exception.status;

  return (
    <Row justify="center" align="middle" style={{ minHeight: "100vh" }}>
      <div className="site-card-border-less-wrapper" style={componentLayout}>
        <Card bordered={true} style={{ width: 450, textAlign: "center" }}>
          {statusError !== 400 ? (
            <div> </div>
          ) : (
            <div>
              <Alert
                icon={<SmileOutlined />}
                message="Error"
                description="The Email or Username is used!"
                type="error"
                showIcon
              />
            </div>
          )}
          {statusError !== 500 ? (
            <div> </div>
          ) : (
            <div>
              <Alert
                icon={<SmileOutlined />}
                message="Error"
                description="Something went wrong! Please try again later"
                type="error"
                showIcon
              />
            </div>
          )}
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

                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "The two passwords that you entered do not match!"
                      )
                    );
                  },
                }),
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
        </Card>
      </div>
    </Row>
  );
};

export default AccountSignUpPage;
