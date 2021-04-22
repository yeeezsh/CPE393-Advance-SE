import { LinkOutlined, MenuOutlined } from "@ant-design/icons";
import { Layout } from "antd";
import React from "react";

const HeaderCSS: React.CSSProperties = {
  background: "#fff",
  width: "100vw",
  position: "absolute",
  height: 54,
  zIndex: 1,
};

const Logo = () => (
  <div style={{ display: "flex" }}>
    <LinkOutlined style={{ fontSize: 30, marginTop: 14 }} />
    <div style={{ fontSize: 16 }}>OUM</div>
  </div>
);

const { Header: HeaderAnt } = Layout;

const Header: React.FC<{ collapsed: boolean; toggle: () => void }> = (
  props
) => {
  return (
    <HeaderAnt style={HeaderCSS}>
      <div style={{ position: "absolute" }}>
        <MenuOutlined
          onClick={props.toggle}
          style={{
            marginLeft: -22,
            fontSize: 24,
            marginTop: 10,
          }}
        />
      </div>

      <div style={{ position: "relative", marginLeft: 32, marginTop: -2 }}>
        <Logo />
      </div>
    </HeaderAnt>
  );
};

export default Header;
