import React from "react";
import { Button as AntdButton } from "antd";

export type ButtonProps = {
  style?: React.CSSProperties;
  rounded?: boolean;
  width?: number;
  onClick?: () => void;
  type?:
    | "text"
    | "link"
    | "ghost"
    | "default"
    | "primary"
    | "dashed"
    | undefined;
};

const Button: React.FC<ButtonProps> = (props) => {
  return (
    <AntdButton
      type={props.type}
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
