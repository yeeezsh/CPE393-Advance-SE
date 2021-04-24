import React from "react";
import { LinkOutlined, MenuOutlined } from "@ant-design/icons";
import {
  LogoStyle,
  NavbarStyle,
  NavbarStyleRight,
  SearchBarContainer,
} from "./styled";
import { Searchbar } from "../../components/SearchBar";
import AccountBadge from "../../components/AccountBadge";

const Navbar: React.FC<{ title: string; onClick: () => void }> = (props) => {
  return (
    <>
      <NavbarStyle>
        <div style={{ marginLeft: "26px" }}>
          <MenuOutlined
            onClick={props.onClick}
            style={{
              fontSize: 24,
            }}
          />
        </div>

        <LogoStyle>
          <LinkOutlined style={{ fontSize: 30, padding: 0, margin: 0 }} />
          <p style={{ fontSize: 16, padding: 0, margin: 0 }}>{props.title}</p>
        </LogoStyle>

        <SearchBarContainer>
          <Searchbar />
        </SearchBarContainer>
      </NavbarStyle>

      <NavbarStyleRight>
        <AccountBadge style={{ height: "80%" }} username="Hello" />
      </NavbarStyleRight>
    </>
  );
};

export default Navbar;
