import React, { useState } from "react";
import { Tag } from "antd";
const { CheckableTag } = Tag;

const tags = ["Movies", "Books", "Music", "Sports"];

const Categories: React.FC = () => {
  const [tags, setTags] = useState<
    {
      label: string;
      checked: boolean;
    }[]
  >([]);

  const onCheck = (label: string) => {
    return (checked: boolean) => {
      setTags((s) =>
        s.map((el: { label: string; checked: any }) => {
          if (el.label === label) return { ...el, check: !el.checked };
          return el;
        })
      );
    };
  };

  return (
    <>
      <div>
        <strong style={{ marginRight: 8, marginLeft: 8 }}>Categories:</strong>
        {tags.map((tag) => (
          <CheckableTag
            key={tag.label || ""}
            checked={tag.checked}
            onChange={onCheck(tag.label)}
          >
            {tag}
          </CheckableTag>
        ))}
      </div>
    </>
  );
};

export default Categories;
