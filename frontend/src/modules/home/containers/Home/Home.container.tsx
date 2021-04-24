import { Layout } from "antd";
import React, { useState } from "react";
import Body from "./Container";
import Header from "./Header";
import Sider from "./Sider";

export interface HomeLayoutProps {
  collapse?: boolean;
}

const HomeContainer: React.FC<HomeLayoutProps> = (props) => {
  const [collapsed, setCollapsed] = useState<boolean>(props.collapse || false);
  const toggle = () => setCollapsed((s) => !s);

  return (
    <Layout style={{ height: "100vh" }}>
      <Header collapsed={collapsed} toggle={toggle} />
      <Sider collapsed={collapsed} />
      <Body collapsed={collapsed} toggle={toggle}>
        {props.children}
      </Body>
    </Layout>
  );
};

export default HomeContainer;
