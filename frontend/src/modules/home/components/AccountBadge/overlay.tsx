import React from "react";
import { AccountBadgeOverlayStyle } from "./styled";

export type OverlayProps = {
  position: "left" | "right";
};

const Overlay: React.FC<OverlayProps> = (props) => {
  let style: React.CSSProperties = {
    left: 0,
  };
  if (props.position === "right") style = { right: 0 };
  return (
    <AccountBadgeOverlayStyle style={{ ...style, position: "fixed" }}>
      {props.children}
    </AccountBadgeOverlayStyle>
  );
};

export default Overlay;
