import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Col, Layout, Row } from "antd";
import React from "react";
import styled from "styled-components";

const HeaderCSS: React.CSSProperties = {
  background: "#fff",
  width: "100vw",
  position: "absolute",
  zIndex: 1,
};

const Logo = styled.div`
  background: gray;
  margin: 0px;
  border-radius: 50px;
  height: 50px;
  margin-top: 7px;
  text-align: center;
`;

const { Header: HeaderAnt } = Layout;

const Header: React.FC<{ collapsed: boolean; toggle: () => void }> = (
  props
) => {
  return (
    <HeaderAnt style={HeaderCSS}>
      <Row justify="start" style={{ height: 64 }}>
        <Col span={1}>
          {React.createElement(
            props.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              onClick: props.toggle,
              style: {
                marginLeft: -24,
                fontSize: 24,
                marginTop: 20,
              },
            }
          )}
        </Col>
        <Col span={4} offset={1}>
          <Logo>Logo Ja</Logo>
        </Col>
      </Row>
    </HeaderAnt>
  );
};

export default Header;
