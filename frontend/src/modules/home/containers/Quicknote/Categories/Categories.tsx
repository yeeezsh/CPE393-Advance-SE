import React, { useState } from "react";
import { Input,Tag } from "antd";
import { PlusOutlined } from '@ant-design/icons';
const { CheckableTag } = Tag;


const tags = ["Movies", "Books", "Music", "Sports"];

const Categories: React.FC = () => {
  const [tags, setTags] = useState<
    {
      label: string;
      checked: boolean;
      inputVisible: boolean;
      editInputIndex: -1;
      editInputValue: '';
    }[]
  >([]);
  const [inputValue, setInputValue] = useState({inputVal: ""});

  const onCheck = (label: string) => {
    return (checked: boolean) => {
      setTags((s) =>
        s.map((el: { label: string; checked: any;inputVisible: any; editInputIndex: any; editInputValue: any;  }) => {
          if (el.label === label) return { ...el, check: !el.checked };
          return el;
        })
      );
    };
  };
  // const showInput = () => {
  //   setTags({ inputVisible: true });
  // };



  // const handleInputChange = (e) => {
  //   setInputValue({ inputVal: e.target.value });
  // };

  // const handleClose = (removedTag: any) => {
  //   const tags = tags.checked.filter(tag => tag !== removedTag);
  //   console.log(tags);
  //   setState({ tags });
  // };

  return (
    <>
      <div>
        <strong style={{ marginRight: 8, marginLeft: 8 }}>Categories:</strong>
        {tags.map((tag) => (
          <CheckableTag
            key={tag.label || ""}
            checked={tag.checked}
            onChange={onCheck(tag.label)}
            // closable={index !== 0}
            // onClose={() => handleClose(tag)}
          >
            {tag}
          </CheckableTag>
        ))}
        {/* {inputVisible && (
          <Input
            ref={this.saveInputRef}
            type="text"
            size="small"
            value={inputValue.inputVal}
            onChange={handleInputChange}
            // onBlur={this.handleInputConfirm}
            // onPressEnter={this.handleInputConfirm}
          />
        )} */}
        {/* {!inputVisible && (
          <Tag onClick={showInput}>
            <PlusOutlined /> New Tag
          </Tag>
        )} */}

        
      </div>
    </>
  );
};

export default Categories;
