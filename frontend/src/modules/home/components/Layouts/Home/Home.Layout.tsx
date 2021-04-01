import { Layout } from "antd";
import React, { useState } from "react";
import Container from "./Container";
import Header from "./Header";
import Sider from "./Sider";

const HomeLayout: React.FC = (props) => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
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
