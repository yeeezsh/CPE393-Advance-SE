import React from "react";
import { AccountBadgeStyle, CharacterBadgeStyle } from "./styled";

export type AccountBadgeProps = {};

const CharacterBadge: React.FC = (props) => (
  <CharacterBadgeStyle>{props.children}</CharacterBadgeStyle>
);

const AccountBadge: React.FC<AccountBadgeProps> = () => {
  return (
    <AccountBadgeStyle>
      <div>Hello</div>
      <CharacterBadge>H</CharacterBadge>
    </AccountBadgeStyle>
  );
};

export default AccountBadge;
