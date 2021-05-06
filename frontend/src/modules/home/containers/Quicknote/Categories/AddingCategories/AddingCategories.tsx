import React, {useState} from 'react';
import { Tag, Input, Tooltip } from 'antd';
import { PlusOutlined } from '@ant-design/icons';


 const AddingCategories:React.FC =() =>{


    const [state, setState] = useState({
        inputVisible: false,
        inputValue: '',
        editInputIndex: -1,
        editInputValue: '',
    
    })
    // const saveInputRef = (input: any) => {
    //     this.input = input;
    //   };

    // const handleInputChange = (e:any) => {
    //     setState( ...state.inputValue,{inputValue: e.target.value} );
    //   };
    
    // const handleEditInputChange = e => {
    //     setState({ editInputValue: e.target.value });
    //   };
    const showInput = () => {
        setState({ ...state, inputVisible: true });
      };
    
    
    const handleInputConfirm = (e:any) => {
        console.log('e',e.target.value);
        setState({...state, inputValue: e.target.value})
        setState({...state, inputVisible: false})

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
    return (
        <div>

        {state.inputVisible && (
          <Input
            // ref={this.saveInputRef}
            type="text"
            size="small"
            className="tag-input"
            value={state.inputValue}
            onChange={e =>{
                setState({...state, inputValue:e.target.value})
            }}
            // onBlur={this.handleInputConfirm}
            onPressEnter={handleInputConfirm}
          />
        )}
        {!state.inputVisible && (
          <Tag className="site-tag-plus" onClick={showInput} >
            <PlusOutlined /> New Tag
          </Tag>
        )}
        </div>
    )
}
export default AddingCategories;


