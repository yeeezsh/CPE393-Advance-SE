import React, {useState} from 'react';
import { Upload, Button } from 'antd';
import { FileImageOutlined } from '@ant-design/icons';

const UploadImage: React.FC = () => {
  
  const props = {
    onChange: (info: { fileList: any; }) => {
      console.log(info.fileList);
      var images = info.fileList.length

      const formData = new FormData(); 
      for(var i = 0; i<images; i++)
      {
        formData.append( 
          "image"+i, 
          info.fileList[i].file, 
          info.fileList[i].file.name
        ); 
        
      }
      console.log(JSON.stringify(formData));
    },
    
  };
    return (
      <>
            <div>
                <Upload>
                  <Button icon={<FileImageOutlined />}> Upload Image </Button>
                </Upload> 
          </div>
      </>
    );
};

export default UploadImage;
