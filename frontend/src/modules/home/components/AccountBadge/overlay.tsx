import React from "react";
import { AccountBadgeStyle } from "./styled";

export type OverlayProps = {
  position: "left" | "right";
};

const Overlay: React.FC<OverlayProps> = (props) => {
  let style: React.CSSProperties = {
    left: 0,
  };
  if (props.position === "right") style = { right: 0 };
  return (
    <AccountBadgeStyle
      className="overlay"
      style={{ ...style, position: "fixed" }}
    >
      {props.children}
    </AccountBadgeStyle>
  );
};

export default Overlay;
