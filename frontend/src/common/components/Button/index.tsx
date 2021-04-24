import React from "react";
import { Button as AntdButton } from "antd";

export type ButtonProps = {
  style?: React.CSSProperties;
  rounded?: boolean;
  width?: number;
  onClick?: () => void;
};

const Button: React.FC<ButtonProps> = (props) => {
  return (
    <AntdButton
      style={{
        ...props.style,
        borderRadius: props?.rounded ? "1em" : "0%",
        width: props.width,
      }}
      onClick={props?.onClick}
    >
      {props.children}
    </AntdButton>
  );
};

export default Button;
