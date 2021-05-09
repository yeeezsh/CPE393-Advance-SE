import { LinkOutlined, PushpinOutlined } from "@ant-design/icons";
import { Button, Row } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useAddBookmarkMutation } from "../../../../common/services/generate/generate-types";
import { Store } from "../../../../common/store";
import { InputCard, InputHeader, InputStyle, InputTextfield } from "./styled";
import Tags from "../Tags";

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
      <InputCard>
        <InputHeader>
          {error && <span style={{ color: "red" }}>Please fill</span>}
          <LinkOutlined />
          <InputStyle
            value={original}
            placeholder="http://"
            onChange={(e) => {
              setOriginal(() => e.target.value);
              setError(false);
            }}
          />

          <Button
            style={{ float: "right", marginTop: "0.5rem" }}
            type="primary"
            icon={<PushpinOutlined />}
            onClick={onAdd}
          >
            ADD
          </Button>
        </InputHeader>
        <InputTextfield
          placeholder="Take a note"
          value={note}
          onChange={(e) => setNote(() => e.target.value)}
        />

        {/* tags */}
        <Tags />
      </InputCard>
    </Row>
  );
};

export default Add;
