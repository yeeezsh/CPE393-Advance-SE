import { SmileOutlined } from "@ant-design/icons";
import { Alert } from "antd";
import React from "react";

export const DuplicationAlert: React.FC = () => (
  <Alert
    icon={<SmileOutlined />}
    message="Error"
    description="Username or Email has been used!"
    type="error"
    showIcon
  />
);
export const UnexpectedErrorAlert: React.FC = () => (
  <Alert
    icon={<SmileOutlined />}
    message="Error"
    description="Something went wrong! Please try again later"
    type="error"
    showIcon
  />
);
const ErrorBadge: React.FC<{ statusError: number }> = (props) => {
  const { statusError } = props;
  return (
    <>
      {statusError === 400 && <DuplicationAlert />}
      {statusError === 500 && <UnexpectedErrorAlert />}
    </>
  );
};

export default ErrorBadge;
