import {
  BookOutlined,
  DeleteOutlined,
  FieldTimeOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetTagsByOwnerQuery } from "../../../../common/services/generate/generate-types";
import { Store } from "../../../../common/store";
import { actions } from "../../../../common/store/bookmark";
const { Sider: SiderAnt } = Layout;

const SiderContainer: React.FC<{ collapsed: boolean }> = (props) => {
  const dispatch = useDispatch();

  const userId = useSelector((s: Store) => s.user.user._id);
  const { data } = useGetTagsByOwnerQuery({ variables: { userId } });

  const onSelect = (tag: string) => {
    dispatch(actions.setSelectedTag({ tag }));
  };
  return (
    <SiderAnt
      trigger={null}
      collapsible
      collapsed={props.collapsed}
      style={{ width: 100, marginTop: 50, background: "white" }}
    >
      <Menu theme="light" mode="inline">
        <Menu.Item
          key="recent"
          icon={<FieldTimeOutlined />}
          onClick={() => onSelect("delete")}
        >
          Recent
        </Menu.Item>
        {data?.listAllTag.result.map((el) => (
          <Menu.Item
            key={el._id}
            icon={<BookOutlined />}
            onClick={() => onSelect(el._id)}
          >
            {el.label}
          </Menu.Item>
        ))}

        <Menu.Item
          key="archive"
          icon={<DeleteOutlined />}
          onClick={() => onSelect("archive")}
        >
          Archive
        </Menu.Item>
        <Menu.Item
          key="trash"
          icon={<DeleteOutlined />}
          onClick={() => onSelect("delete")}
        >
          Trash
        </Menu.Item>
      </Menu>
    </SiderAnt>
  );
};

export default SiderContainer;
