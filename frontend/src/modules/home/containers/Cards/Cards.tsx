import React, {useState} from 'react'
import { Card, Modal, Button } from 'antd';
import Quicknote from '../Quicknote/QuickNote';
import Categories from '../Quicknote/Categories/Categories';
import UploadImage from '../Quicknote/Upload-image/UploadImage';


import './Cards.styles.css';
const { Meta } = Card;

const Cards: React.FC = () => {

    const initialState = {URL: "", Category:[]};
    const [title,setTitle] = useState(initialState);
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    const showModal = () => {
        setVisible(true);
    };
    const handleOk = () => {
        // setLoading(true);
            setVisible(false);
            // setLoading(false);
    };
    const handleCancel = () => {
        setVisible(false);
    };
    
    
    return (
        <>
        <div className = "card">
            <Card
                hoverable
                // style={{ width: 240 }}
                onClick = {showModal}
                cover={<img alt="example" src="https://wit279.files.wordpress.com/2012/10/nature-wallpaper-full-hd-1920_1080-0722.jpg" />}
            >
                <Meta title={title.URL} description={title.Category} />
            </Card>,
        </div>

        <Modal
          visible={visible}
          onCancel={handleCancel}
          footer={[
            <Button key="submit" type="primary" loading={loading} onClick={handleOk=>{"data"}}>
            Submit
          </Button>,
            <Button key="back" onClick={handleCancel}>
              Cancel
            </Button>,
          ]}
        >   
            <div className = "showModal">
                {/* <div className= "image"> */}
                <img className = "image" alt="example"  src="https://wit279.files.wordpress.com/2012/10/nature-wallpaper-full-hd-1920_1080-0722.jpg" />
                {/* </div> */}
                <div className = "text">
                    {title.URL}
                    {/* <Quicknote /> */}
                    {/* <UploadImage />
                    <Categories /> */}
                </div>
                <div style={{ float: "left" }}>
                <div className = "divStyle">
                    {/* <UploadImage /> */}
                    <Categories />
                </div>
                </div>

                
            </div>

          
        </Modal>

        </>

    );
};
export default Cards;