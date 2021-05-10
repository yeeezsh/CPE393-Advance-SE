import { LinkOutlined, PushpinOutlined } from "@ant-design/icons";
import { Button, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAddBookmarkMutation } from "../../../../common/services/generate/generate-types";
import { Store } from "../../../../common/store";
import Tags, { TagType } from "../Tags";
import { InputCard, InputHeader, InputStyle, InputTextfield } from "./styled";

const Add: React.FC<{ onAdd: () => void }> = (props) => {
  const userId = useSelector((s: Store) => s.user.user._id);
  const [original, setOriginal] = useState("");
  const [note, setNote] = useState("");
  const [error, setError] = useState<boolean>(false);
  const alltags = useSelector((s: Store) => s.tags.tags);

  const [tags, setTags] = useState<TagType>([]);

  useEffect(() => {
    alltags &&
      setTags(
        alltags.map((el) => ({
          ...el,
          checked: false,
          createAt: new Date(el.createAt),
        }))
      );
  }, [alltags]);

  const [addBookmarkMutation] = useAddBookmarkMutation({
    variables: {
      bookmark: {
        owner: "",
        tags: [],
        original: "",
        note: "",
      },
    },
    fetchPolicy: "no-cache",
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
            tags: tags.filter((el) => el.checked).map((el) => el._id),
          },
        },
      });
      props.onAdd();
      clear();
    }
  };

  const clear = () => {
    setOriginal("");
    setNote("");
    setTags(
      alltags.map((el) => ({
        ...el,
        checked: false,
        createAt: new Date(el.createAt),
      }))
    );
  };

  const onSelectTag = (tagId: string) => {
    setTags((t) => {
      return t.map((el) => {
        const isSelecting = el._id === tagId;
        if (isSelecting) {
          return {
            ...el,
            checked: !el.checked,
          };
        }
        return el;
      });
    });
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
        <Tags
          tags={tags}
          onSelect={onSelectTag}
          onAddNewTag={(newTag) =>
            setTags((t) => [
              ...t,
              {
                _id: newTag._id,
                checked: true,
                createAt: newTag.createAt,
                label: newTag.label,
              },
            ])
          }
        />
      </InputCard>
    </Row>
  );
};

export default Add;
