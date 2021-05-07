import React, { useRef, useState } from "react";
import CharacterBadge from "../../../../common/components/CharacterBadge";
import useOnClickOutside from "../../../../common/hooks/useOnClickOutside";
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
  overlayTopMargin?: number;
};

const UsernameBadge: React.FC = (props) => (
  <UsernameBadgeStyle>{props.children}</UsernameBadgeStyle>
);

const AccountBadge: React.FC<AccountBadgeProps> = (props) => {
  const firstCharacter = props.username?.slice(0, 1).toLocaleUpperCase();
  const [overlay, setOverlay] = useState<boolean>(props?.overlay || false);

  const ref = useRef(null);
  // TODO: Fix bug that cannot click on logout button
  // useOnClickOutside(ref, () => setOverlay(() => false));

  return (
    <>
      <AccountBadgeStyle
        ref={ref}
        style={props?.style}
        onClick={() => setOverlay((o) => !o)}
      >
        <UsernameBadge>{props.username}</UsernameBadge>
        <CharacterBadge>{firstCharacter}</CharacterBadge>
      </AccountBadgeStyle>

      {/* overlay */}
      {overlay && (
        <Overlay
          position={props.overlayPosition || "right"}
          style={{ marginTop: props.overlayTopMargin || 58 }}
        >
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
