import { LockOutlined, MailOutlined, SmileOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Divider,
  Form,
  Input,
  Row,
  Typography,
  Alert,
} from "antd";
import React, { useEffect, useState } from "react";
import { useUserLoginMutation } from "../../../../common/services/generate/generate-types";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../../../common/store/user";
import { FormFinishValue, FormLogin } from "./types";

const { Title } = Typography;

const loginButtonLayout = {
  width: "100%",
};

const componentLayout = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const AccountSignInPage: React.FC<{ onError?: (status: number) => void }> = (
  props
) => {
  const history = useHistory();
  const [errorMsg, setErrorMsg] = useState("");
  const [statusError, setStatusError] = useState(0);
  const [form] = Form.useForm<FormLogin>();
  const dispatch = useDispatch();

  const [userLoginMutation, { data, error }] = useUserLoginMutation({
    errorPolicy: "all",
  });

  useEffect(() => {
    if (!error && data) {
      const duplicated = localStorage.getItem("user");
      if (duplicated) localStorage.removeItem("user");
      localStorage.setItem("user", JSON.stringify(data.userLogin));
      dispatch(setUser(data.userLogin));
      history.push("/");
    } else if (error) {
      setStatusError(error?.graphQLErrors[0].extensions?.exception.status);
      setErrorMsg(error?.graphQLErrors[0].message);
    }
  }, [data, error, history, dispatch]);

  const onFinish: FormFinishValue = (values) => {
    values &&
      userLoginMutation({
        variables: {
          user: {
            email: values.email,
            password: values.password,
          },
        },
      });
  };

  const onClickSignUp = () => {
    history.push("/signup");
  };

  props.onError && props.onError(statusError);
  return (
    <Row justify="center" align="middle" style={{ minHeight: "100vh" }}>
      <div className="site-card-border-less-wrapper" style={componentLayout}>
        <Card bordered={true} style={{ width: 450 }}>
          {error && (
            <Alert
              icon={<SmileOutlined />}
              message="Error"
              description={errorMsg}
              type="error"
              showIcon
            />
          )}
          <Title level={4} style={componentLayout}>
            Sign in to application
          </Title>

          <Form
            form={form}
            name="normal_login"
            initialValues={{ remember: true }}
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
                prefix={<MailOutlined />}
                placeholder="Enter email address"
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

            <Form.Item>
              <div style={{ textAlign: "center" }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={loginButtonLayout}
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

export default AccountSignInPage;
