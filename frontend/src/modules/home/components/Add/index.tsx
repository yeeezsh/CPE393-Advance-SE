import { LinkOutlined } from "@ant-design/icons";
import { Button, Input, Row } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useAddBookmarkMutation } from "../../../../common/services/generate/generate-types";
import { Store } from "../../../../common/store";
import Tags from "../Tags";

const { TextArea } = Input;

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
    <div>
      {error && <span style={{ color: "red" }}>Please fill</span>}
      <Input
        prefix={<LinkOutlined />}
        value={original}
        placeholder="http://"
        onChange={(e) => {
          setOriginal(() => e.target.value);
          setError(false);
        }}
      />
      <div style={{ height: "12px" }} />

      <TextArea
        placeholder="note"
        rows={2}
        value={note}
        onChange={(e) => setNote(() => e.target.value)}
      />

      {/* tags */}
      <div style={{ height: "4px" }} />
      <Tags />
      <Row justify="end">
        <Button type="primary" onClick={onAdd}>
          Add
        </Button>
      </Row>
    </div>
  );
};

export default Add;
