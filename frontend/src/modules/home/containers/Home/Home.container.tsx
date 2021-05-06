import { Layout } from "antd";
import React, { useState } from "react";
import Navbar from "../Navbar";
import Body from "./Container";
import SiderContainer from "../Sider";
import Cards from '../Cards/Cards';
import Quicknote from '../Quicknote/QuickNote';

export interface HomeContainerProps {
  collapse?: boolean;
}

const HomeContainer: React.FC<HomeContainerProps> = (props) => {
  const [collapsed, setCollapsed] = useState<boolean>(props.collapse || false);
  const toggle = () => setCollapsed((s) => !s);

  return (
    <Layout style={{ height: "100vh" }}>
      <Navbar title="OUM" onClick={toggle} />

      <SiderContainer collapsed={collapsed} />
      <Body collapsed={collapsed} toggle={toggle}>
        {props.children}
        <Quicknote />
        <Cards />

      </Body>
    </Layout>
  );
};

export default HomeContainer;
