import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React from "react";
const { Sider: SiderAnt } = Layout;

const SiderContainer: React.FC<{ collapsed: boolean }> = (props) => {
  return (
    <SiderAnt
      trigger={null}
      collapsible
      collapsed={props.collapsed}
      style={{ width: 100, marginTop: 50, background: "white" }}
    >
      <Menu theme="light" mode="inline" defaultSelectedKeys={["1"]}>
        <Menu.Item key="1" icon={<UserOutlined />}>
          nav 1
        </Menu.Item>
        <Menu.Item key="2" icon={<VideoCameraOutlined />}>
          nav 2
        </Menu.Item>
        <Menu.Item key="3" icon={<UploadOutlined />}>
          nav 3
        </Menu.Item>
      </Menu>
    </SiderAnt>
  );
};

export default SiderContainer;
