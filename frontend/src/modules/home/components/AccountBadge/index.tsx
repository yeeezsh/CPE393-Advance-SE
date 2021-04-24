import React from "react";
import CharacterBadge from "../../../../common/components/CharacterBadge";
import Overlay, { OverlayProps } from "./overlay";
import { AccountBadgeStyle, UsernameBadgeStyle } from "./styled";

export type AccountBadgeProps = {
  username: string;
  style?: React.CSSProperties;
  overlay?: OverlayProps["position"];
  overlayContainer?: React.FC;
};

const UsernameBadge: React.FC = (props) => (
  <UsernameBadgeStyle>{props.children}</UsernameBadgeStyle>
);

const AccountBadge: React.FC<AccountBadgeProps> = (props) => {
  const firstCharacter = props.username.slice(0, 1).toLocaleUpperCase();

  return (
    <AccountBadgeStyle style={props?.style}>
      <UsernameBadge>{props.username}</UsernameBadge>
      <CharacterBadge>{firstCharacter}</CharacterBadge>
      <Overlay position={props.overlay || "left"}>
        {props.overlayContainer}
      </Overlay>
    </AccountBadgeStyle>
  );
};

export default AccountBadge;
