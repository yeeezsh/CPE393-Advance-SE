import { LinkOutlined,PushpinOutlined } from "@ant-design/icons";
import { Button, Input, Row } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useAddBookmarkMutation } from "../../../../common/services/generate/generate-types";
import { Store } from "../../../../common/store";
import Tags from "../Tags";

const { TextArea } = Input;
const styles = {
  inputCard: {
    width: "600px",
    margin: "20px auto",
    backgroundColor: "#FFFFFF",
    minHeight: "200px",
    border: "1px solid hsl(216, 8% ,88%)",
    borderRadius: "4px",
    paddingBottom: "15px",

  },
  inputHeader: {
    fontFamily: "Arial",
    fontSize: "15px",
    borderRadius: "2px 2px 0 0",
    borderBottom: "1px solid #dddfe2 ",
    padding: "15px",

  },
  inputField: {
    height: "80px",
    width: "595px",
    padding: "10px",
    border: "none",
    fontFamily: "Arial",
    fontSize: "15px",
    outline: "none",

  },
  inputUrl: {
    height: "40px",
    width: "450px",
    padding: "10px",
    border: "none",
    fontFamily: "Arial",
    fontSize: "15px",
    outline: "none",
  },
};
const Add: React.FC<{ onAdd: () => void }> = (props) => {
  const userId = useSelector((s: Store) => s.user.user._id);
  const [original, setOriginal] = useState("");
  const [note, setNote] = useState("");
  const [error, setError] = useState<boolean>(false);
  const [addBookmarkMutation] = useAddBookmarkMutation({
    variables: {
      bookmark: {
        owner: "",
        tags: [],
        original: "",
        note: "",
      },
    },
  });

  const onAdd = () => {
    if (original.length === 0 || !original) {
      setError(true);
    } else {
      setError(false);

      addBookmarkMutation({
        variables: {
          bookmark: {
            owner: userId,
            note,
            original,
            tags: [],
          },
        },
      });
      props.onAdd();
    }
  };

  return (
    <Row justify="center">

    <div style={styles.inputCard}>
        <div style={styles.inputHeader}>

      {error && <span style={{ color: "red" }}>Please fill</span>}
          <LinkOutlined />
          <input
            value={original}
            style={styles.inputUrl}
            placeholder="http://"
            onChange={(e) => {
              setOriginal(() => e.target.value);
              setError(false);
            }}
          />
            <Button style={{float:"right",marginTop:"0.5rem"}} type="primary" icon={<PushpinOutlined />} onClick={onAdd}>
              {" "}
                ADD{" "}
            </Button>
        </div>
        <textarea
          placeholder="Take a note"
          style={styles.inputField}
          value={note}
          onChange={(e) => setNote(() => e.target.value)}
        />
        {/* tags */}
        <div style={{ marginLeft: "0.5rem" }}>
        <Tags
        //   tags={props.tags}
        />
        </div>
      </div>
    </Row>

  );
};

export default Add;
