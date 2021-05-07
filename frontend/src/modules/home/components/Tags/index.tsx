import React, { useState } from "react";
import { Input, Tag as AntdTag } from "antd";
import { PlusOutlined, CloseOutlined } from "@ant-design/icons";
import onEnter from "../../../../common/utils/onEnterKey";

const { CheckableTag } = AntdTag;

export interface TagsProps {
  tags?: TagType;
}

export type TagType = {
  _id: string;
  label: string;
  checked: boolean;
}[];

const MOCK_TAGS: TagType = [
  { _id: "1", label: "t1", checked: false },
  { _id: "2", label: "t2", checked: true },
  { _id: "3", label: "t3", checked: false },
];

const Tags: React.FC<TagsProps> = (props) => {
  const [tags, setTags] = useState<TagType>(props.tags || MOCK_TAGS);
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

  const onDelete = (id: string) => {
    setTags((tags) => tags.filter((t) => t._id !== id));
  };

  const onSelect = (id: string) => {
    setTags((tags) =>
      tags.map((t) => (t._id === id ? { ...t, checked: !t.checked } : t))
    );
  };

  return (
    <>
      <div>
        {tags.map((el) => (
          <CheckableTag
            onClick={() => onSelect(el._id)}
            checked={el.checked}
            style={{ minWidth: 40, textAlign: "center" }}
          >
            {!el.checked && (
              <>
                <AntdTag>
                  {el.label}
                  <CloseOutlined
                    onClick={() => onDelete(el._id)}
                    style={{ marginLeft: "2em", cursor: "pointer" }}
                  />
                </AntdTag>
              </>
            )}
            {el.checked && (
              <>
                {el.label}
                <CloseOutlined
                  onClick={() => onDelete(el._id)}
                  style={{ marginLeft: "2em", cursor: "pointer" }}
                />
              </>
            )}
          </CheckableTag>
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
      </div>
    </>
  );
};

export default Tags;
