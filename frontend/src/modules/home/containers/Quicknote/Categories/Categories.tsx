import React, { useState } from "react";
import { Input,Tag } from "antd";
import { PlusOutlined } from '@ant-design/icons';
import AddingCategories from "./AddingCategories/AddingCategories";
const { CheckableTag } = Tag;


const tags = ["Movies", "Books", "Music", "Sports"];

const Categories: React.FC = () => {
  const [tags, setTags] = useState<
    {
      label: string;
      checked: boolean;
      inputVisible: boolean;
      inputValue: '';
      // editInputIndex: -1,
      // editInputValue: '',

    }[]
  >([]);
  const [inputValue, setInputValue] = useState({inputVal: ""});

  const onCheck = (label: string) => {
    return (checked: boolean) => {
      setTags((s) =>
        s.map((el: { label: string; checked: any; inputVisible: any; inputValue: any; }) => {
          if (el.label === label) return { ...el, check: !el.checked };
          return el;
        })
      );
    };
  };

  const showInput = () => {
    // setTags((s) =>
    //     s.map((el: {inputVisible: true; }) => {
    //       return el;
    //     })
    //   );
    setTags({...tags,inputVisible: true });
  };


const handleInputConfirm = (e:any) => {
    console.log('e',e.target.value);
    setTags({...tags, inputValue: e.target.value})
    setTags({...tags, inputVisible: false})

    // const { inputValue } = this.state;
    // let { tags } = this.state;
    // if (inputValue && tags.indexOf(inputValue) === -1) {
    //   tags = [...tags, inputValue];
    // }
    // console.log(tags);
    // setState({
    //   inputVisible: false,
    //   inputValue: '',
    // });
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
        {/* <AddingCategories /> */}

        
      </div>
    </>
  );
};

export default Categories;
