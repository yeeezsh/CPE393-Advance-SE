import React, { useState } from "react";
import CharacterBadge from "../../../../common/components/CharacterBadge";
import AccountInfo from "./account.info";
import Overlay, { OverlayProps } from "./overlay";
import { AccountBadgeStyle, UsernameBadgeStyle } from "./styled";

export type AccountBadgeProps = {
  username: string;
  email: string;
  displayname: string;
  style?: React.CSSProperties;
  overlayPosition?: OverlayProps["position"];
  overlay?: boolean;
};

const UsernameBadge: React.FC = (props) => (
  <UsernameBadgeStyle>{props.children}</UsernameBadgeStyle>
);

const AccountBadge: React.FC<AccountBadgeProps> = (props) => {
  const firstCharacter = props.username.slice(0, 1).toLocaleUpperCase();
  const [overlay, setOverlay] = useState<boolean>(props?.overlay || false);

  return (
    <>
      <AccountBadgeStyle
        style={props?.style}
        onClick={() => setOverlay((o) => !o)}
      >
        <UsernameBadge>{props.username}</UsernameBadge>
        <CharacterBadge>{firstCharacter}</CharacterBadge>
      </AccountBadgeStyle>

      {/* overlay */}
      {overlay && (
        <Overlay position={props.overlayPosition || "right"}>
          <AccountInfo
            username={props.username}
            email={props.email}
            displayname={props.displayname}
          />
        </Overlay>
      )}
    </>
  );
};

export default AccountBadge;
