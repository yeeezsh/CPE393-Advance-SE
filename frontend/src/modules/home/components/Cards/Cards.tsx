import React, {useState} from 'react'
import { Card, Modal, Button } from 'antd';
// import Quicknote from '../Quicknote/QuickNote';
// import Categories from '../Quicknote/Categories/Categories';
import UploadImage from '../Upload-image/UploadImage';
import Tags from '../Tags/index';
import Form from 'antd/lib/form/Form';

const { Meta } = Card;

const styles  = {
    card: {
        height: "200px",
        width: "300px",
        margin: "15px",
        padding: "3px",
    },
    showModal: {
        height: "600px",
        width: "440px",
        padding: "5px",
        alignContent: "center",
        alignItems: "center",
        alignSelf: "center",
    },
    image: {
        height: "65%",
        /* width: ; */
        width: "100%",
        margin: "15px",
    },
    text: {
        height: "80px",
        width: "300px",
    },
    divStyle: {
        display: "flex",
        alignItems: "center",
        marginTop: "0.5rem",
    },
        inputField: {
        height: "100px",
        width: "400px",
        padding: "10px",
        border: "none",
        fontFamily: "Arial",
        fontSize: "20px",
        outline: "none",
      },
}


const Cards: React.FC = () => {

    const [title,setTitle] = useState<{
        url: string;
        tags: string[];
      }>({
        url: "URL from query",
        tags: [],
      });
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    const showModal = () => {
        setVisible(true);
    };
    const handleOk = () => {
        // submit the data edited
        // setLoading(true);
            setVisible(false);
            // setLoading(false);
    };
    const handleCancel = () => {
        setVisible(false);
    };
    
    
    return (
        <>
        <div style={styles.card}>
            <Card
                hoverable
                // style={{ width: 240 }}
                onClick = {showModal}
                cover={<img alt="example" src="https://wit279.files.wordpress.com/2012/10/nature-wallpaper-full-hd-1920_1080-0722.jpg" />}
            >
                <Meta title={title.url} description={title.tags} />
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
            <div style={styles.showModal}>
                {/* <div className= "image"> */}
                <img style={styles.image} alt="example"  src="https://wit279.files.wordpress.com/2012/10/nature-wallpaper-full-hd-1920_1080-0722.jpg" />
                {/* </div> */}
                <Form>
                <input
                    style={styles.inputField}
                    type="text"
                    value={title.url}
                    onChange={e => {
                    setTitle({ ...title, url: e.target.value })
                    }}
                />
                <div style={{ float: "left" }}>
                <strong style={{marginLeft: "1rem" }}>Categories:</strong>

                <div style={styles.divStyle}>
                  
                    <Tags />
                </div>
                <div style={styles.divStyle}>
                    {/* <UploadImage /> */}
                    {/* <Categories /> */}
                    {/* <Tags /> */}
                </div>
                </div>

                </Form>
            </div>

          
        </Modal>

        </>

    );
};
export default Cards;