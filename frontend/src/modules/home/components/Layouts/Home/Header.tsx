import { LinkOutlined, MenuOutlined } from "@ant-design/icons";
import { Col, Layout, Row } from "antd";
import React from "react";

const HeaderCSS: React.CSSProperties = {
  background: "#fff",
  width: "100vw",
  position: "absolute",
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
      <Row justify="start" align="middle" style={{ height: 64 }}>
        <Col span={1}>
          <MenuOutlined
            onClick={props.toggle}
            style={{ marginLeft: -24, fontSize: 24, marginTop: 20 }}
          />
        </Col>

        <Col span={2} offset={1}>
          <Logo />
        </Col>
      </Row>
    </HeaderAnt>
  );
};

export default Header;
