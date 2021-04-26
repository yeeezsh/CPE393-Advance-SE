import { Divider } from "antd";
import React from "react";
import styled from "styled-components";
import Button from "../../../../common/components/Button";
import CharacterBadge from "../../../../common/components/CharacterBadge";

const EmailStyle = styled.p`
  display: flex;
  justify-content: center;
  margin: 0px;
  color: grey;
`;

const DisplayNameStyle = styled.p`
  display: flex;
  justify-content: center;
  margin: 0px;
  font-weight: bold;
`;

const Line: React.FC = () => (
  <Divider style={{ width: "100%", margin: "12px 6px" }} />
);

const ManageButton: React.FC = () => (
  <Button
    style={{ justifyContent: "center", display: "flex", margin: "auto" }}
    rounded
  >
    Manage your Account
  </Button>
);

const LogoutButton: React.FC = () => (
  <Button
    style={{
      justifyContent: "center",
      display: "flex",
      margin: "auto",
      backgroundColor: "grey",
      border: "1px solid grey",
    }}
    rounded
    type="primary"
  >
    Logout
  </Button>
);

export type AccountInfoProps = {
  displayname: string;
  email: string;
  username: string;
};

const AccountInfo: React.FC<AccountInfoProps> = (props) => {
  const firstCharacter = props.username.slice(0, 1).toLocaleUpperCase();

  return (
    <div style={{ width: "100%" }}>
      <CharacterBadge textStyle={{ marginRight: "auto" }}>
        {firstCharacter}
      </CharacterBadge>
      <DisplayNameStyle>{props.displayname}</DisplayNameStyle>
      <EmailStyle>{props.email}</EmailStyle>
      <ManageButton />
      <Line />
      <div style={{ height: 102 }} />
      <LogoutButton />
    </div>
  );
};

export default AccountInfo;
