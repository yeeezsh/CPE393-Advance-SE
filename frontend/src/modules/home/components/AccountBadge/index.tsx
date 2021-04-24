import React from "react";
import {
  AccountBadgeStyle,
  CharacterBadgeStyle,
  UsernameBadgeStyle,
} from "./styled";

export type AccountBadgeProps = {
  username: string;
  style?: React.CSSProperties;
};

const CharacterBadge: React.FC = (props) => (
  <CharacterBadgeStyle>
    <p>{props.children}</p>
  </CharacterBadgeStyle>
);

const UsernameBadge: React.FC = (props) => (
  <UsernameBadgeStyle>{props.children}</UsernameBadgeStyle>
);

const AccountBadge: React.FC<AccountBadgeProps> = (props) => {
  const firstCharacter = props.username.slice(0, 1).toLocaleUpperCase();

  return (
    <AccountBadgeStyle style={props?.style}>
      <UsernameBadge>{props.username}</UsernameBadge>
      <CharacterBadge>{firstCharacter}</CharacterBadge>
    </AccountBadgeStyle>
  );
};

export default AccountBadge;
