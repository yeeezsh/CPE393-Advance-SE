import React from "react";
import { AccountBadgeOverlayStyle } from "./styled";

export type OverlayProps = {
  position: "left" | "right";
  style?: React.CSSProperties;
};

const Overlay: React.FC<OverlayProps> = (props) => {
  let style: React.CSSProperties = {
    left: 0,
  };
  if (props.position === "right") style = { right: 0 };
  return (
    <AccountBadgeOverlayStyle
      style={{ ...style, ...props.style, position: "fixed", top: 0 }}
    >
      {props.children}
    </AccountBadgeOverlayStyle>
  );
};

export default Overlay;
