import { PushpinOutlined } from "@ant-design/icons";
import { Button, Form } from "antd";
import React, {useState} from "react";
import Categories from "./Categories/Categories";
import UploadImage from "./Upload-image/UploadImage";

const styles = {
  inputCard: {
    width: "600px",
    margin: "20px auto",
    backgroundColor: "#FFFFFF",
    minHeight: "200px",
    border: "1px solid hsl(216, 8% ,88%)",
    borderRadius: "4px",
  },
  inputHeader: {
    fontFamily: "Arial",
    fontSize: "15px",
    borderRadius: "2px 2px 0 0",
    borderBottom: "1px solid #dddfe2 ",
    margin: "0",
    padding: "15px",
  },
  inputField: {
    height: "100px",
    width: "580px",
    padding: "10px",
    border: "none",
    fontFamily: "Arial",
    fontSize: "20px",
    outline: "none",
  },
  divStyle: {
    display: "flex",
    alignItems: "center",
    margin: "2px",
  },
};

const QuickNote: React.FC = () => {
  const initialState = {inputURL: ""};
  const [stateInput, setStateInput] = useState(initialState);
  return (
    <>
      <Form>
        <div style={styles.inputCard}>
          <div style={styles.inputHeader}>
            {" "}
            URL
            <div style={{ float: "right" }}>
              <Button icon={<PushpinOutlined />} htmlType="submit">
                {" "}
                ADD{" "}
              </Button>
            </div>
          </div>
          <input
            style={styles.inputField}
            type="text"
            placeholder="Take a note"
            value={stateInput.inputURL}
            onChange={e =>{
              setStateInput({...stateInput, inputURL: e.target.value})
            }}
          />
          <div style={{ height: "60px", width: "578px", marginLeft: "3px"}}>
          <div style={{ float: "left", width: "400px" }}>
              <div style={styles.divStyle}>
                <Categories />
              </div>
            </div>
            <div style={{ float: "right" }}>
              <div style={styles.divStyle}>
                <UploadImage />
              </div>
            </div>
          </div>
        </div>
      </Form>
    </>
  );
};

export default QuickNote;
