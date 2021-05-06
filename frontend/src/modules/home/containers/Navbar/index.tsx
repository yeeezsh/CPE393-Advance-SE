import { LinkOutlined, MenuOutlined } from "@ant-design/icons";
import React from "react";
import { useSelector } from "react-redux";
import { Store } from "../../../../common/store";
import AccountBadge from "../../components/AccountBadge";
import { Searchbar } from "../../components/SearchBar";
import {
  LogoStyle,
  NavbarStyle,
  NavbarStyleRight,
  SearchBarContainer,
} from "./styled";

const Navbar: React.FC<{ title: string; onClick: () => void }> = (props) => {
  const user = useSelector((state: Store) => state.user.user);

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
        <AccountBadge
          style={{ height: "80%", width: "10em" }}
          username={user.username}
          displayname={user.displayName || ""}
          email={user.email || ""}
        />
      </NavbarStyleRight>
    </>
  );
};

export default Navbar;
