import React from "react";
import { LinkOutlined, MenuOutlined } from "@ant-design/icons";
import { LogoStyle, NavbarStyle, NavbarStyleRight } from "./styled";

const Navbar: React.FC<{ title: string; onClick: () => void }> = (props) => {
  return (
    <>
      <NavbarStyle>
        <div style={{ marginLeft: "24px" }}>
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
      </NavbarStyle>

      <NavbarStyleRight>hello</NavbarStyleRight>
    </>
  );
};

export default Navbar;
