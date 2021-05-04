import { SmileOutlined } from "@ant-design/icons";
import { Alert } from "antd";
import React from "react";

const ErrorBadge: React.FC<{ statusError: number }> = (props) => {
  const { statusError } = props;
  return (
    <>
      {statusError === 400 && (
        <Alert
          icon={<SmileOutlined />}
          message="Error"
          description="The Email or Username is used!"
          type="error"
          showIcon
        />
      )}
      {statusError === 500 && (
        <Alert
          icon={<SmileOutlined />}
          message="Error"
          description="Something went wrong! Please try again later"
          type="error"
          showIcon
        />
      )}
    </>
  );
};

export default ErrorBadge;
