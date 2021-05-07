import { PushpinOutlined } from "@ant-design/icons";
import { Button, Form } from "antd";
import React, { useState } from "react";
// import Categories from "./Categories/Categories";
import { useCreateQuickNoteMutation } from "../../../../common/services/generate/generate-types";
// import UploadImage from "../../components/Upload-image/UploadImage";
import Tags from '../../components/Tags/index';
import onEnter from "../../../../common/utils/onEnterKey";

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
    height: "50px",
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
    marginLeft: "1rem",
  },
};

const QuickNote: React.FC= () =>{
// <{
//   onError?: (status: number) => void;
// }> = (props) => {
  // const [
  //   createQuickNoteMutation,
  //   { data, loading, error },
  // ] = useCreateQuickNoteMutation({
  //   errorPolicy: "all",
  // });
  const [stateInput, setStateInput] = useState<{
    domain: string;
    note: string;

    // tags: [];
  }>({
    domain: "",
    note: "",

    // tags: [],
  });
  const [form] = Form.useForm();
  const onFinish = (values: any) => {
    console.log('value',values);
    // createQuickNoteMutation({
    //   variables: {
    //     quicknote: {
    //       domain: stateInput.domain,
    //       note: stateInput.note,
    //     },
    //   },
    };

  return (
    <>
      <Form
      form={form}
      name="quicknote"
      onFinish={(onFinish)}
      >
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
          <Form.Item
            name ="domain"
          >
          <input
            style={styles.inputField}
            type="text"
            placeholder="Adding URLs"
            value={stateInput.domain}
            onChange={e => {
              setStateInput({ ...stateInput, domain: e.target.value })
            }}

          />
          </Form.Item>
          <Form.Item
            name ="note"
          >
          <input
            style={styles.inputField}
            type="text"
            placeholder="Take a note"
            value={stateInput.note}
            onChange={e => {
              setStateInput({ ...stateInput, note: e.target.value })
            }}
          />
          </Form.Item>
          <div style={{ height: "100px", width: "578px", marginLeft: "3px" }}>
            <div style={{ width: "570px" }}>

              <div style={{ float: "left", width: "400px" }}>
                <strong style={{ marginLeft: "1rem" }}>Categories:</strong>
                <div style={styles.divStyle}>
                  {/* <Tags inputTag {...stateInput, => setStateInput(inputTags)}/> */}
                  <Tags />

                </div>
              </div>
            </div>
          </div>

        </div>

      </Form>
    </>
  );
};

export default QuickNote;