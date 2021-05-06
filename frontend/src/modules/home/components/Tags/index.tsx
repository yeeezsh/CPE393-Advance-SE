import React, { useState } from "react";
import { Input, Tag as AntdTag } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import onEnter from "../../../../common/utils/onEnterKey";

export type TagsProps = {};

type TagType = {
  _id: string;
  label: string;
  checked: boolean;
}[];

const MOCK_TAGS: TagType = [
  { _id: "1", label: "t1", checked: false },
  { _id: "2", label: "t2", checked: false },
  { _id: "3", label: "t3", checked: false },
];

const Tags: React.FC<TagsProps> = (props) => {
  const [tags, setTags] = useState<TagType>(MOCK_TAGS);
  const [input, setInput] = useState<{
    visible: boolean;
    value: string;
  }>({
    visible: false,
    value: "",
  });

  const onNewtag = () => {
    setInput((i) => ({ ...i, visible: true }));
  };

  const onFinishNewtag = (label?: string) => {
    label &&
      setTags((t) => [
        ...t,
        { _id: Math.random().toLocaleString(), label, checked: true },
      ]);
    setInput((i) => ({ ...i, visible: false }));
  };

  return (
    <>
      {tags.map((el) => (
        <AntdTag closable style={{ minWidth: 40, textAlign: "center" }}>
          {el.label}
        </AntdTag>
      ))}
      <AntdTag onClick={onNewtag}>
        {!input.visible && (
          <>
            <PlusOutlined /> New Tag
          </>
        )}

        {input.visible && (
          <Input size="small" onKeyPress={onEnter(onFinishNewtag)} />
        )}
      </AntdTag>
    </>
  );
};

export default Tags;
