import { Layout } from "antd";
import React, { useState } from "react";
import Container from "./Container";
import Header from "./Header";
import Sider from "./Sider";

export interface HomeLayoutProps {
  collapse?: boolean;
}

const HomeLayout: React.FC<HomeLayoutProps> = (props) => {
  const [collapsed, setCollapsed] = useState<boolean>(props.collapse || false);
  const toggle = () => setCollapsed((s) => !s);

  return (
    <Layout style={{ height: "100vh" }}>
      <Header collapsed={collapsed} toggle={toggle} />
      <Sider collapsed={collapsed} />
      <Container collapsed={collapsed} toggle={toggle}>
        {props.children}
      </Container>
    </Layout>
  );
};

export default HomeLayout;
