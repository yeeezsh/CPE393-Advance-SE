import { Card, Input, Modal, Tag } from "antd";
import { LinkOutlined } from "@ant-design/icons";

import React, { useState } from "react";
import { BookmarkEditInputDto } from "../../../../common/services/generate/generate-types";
import Tags, { TagType } from "../Tags/index";

const { Meta } = Card;
const { TextArea } = Input;
const styles = {
  inputHeader: {
    fontFamily: "Arial",
    fontSize: "15px",
    borderRadius: "2px 2px 0 0",
    borderBottom: "1px solid #dddfe2 ",
    padding: "15px",
  },
  inputField: {
    height: "75px",
    width: "470px",
    padding: "10px",
    border: "none",
    fontFamily: "Arial",
    fontSize: "15px",
    outline: "none",
  },
  inputUrl: {
    height: "40px",
    width: "420px",
    padding: "10px",
    border: "none",
    fontFamily: "Arial",
    fontSize: "15px",
    outline: "none",
  },
};
export interface CardProps {
  domain: string;
  original: string;
  note: string;
  _id: string;
  tags: TagType;
  onEdit?: (data: BookmarkEditInputDto) => void;
}

const VisibleCard: React.FC<CardProps & { onClick: () => void }> = (props) => (
  <div onClick={props.onClick}>
    <Meta title={props.domain} description={props.note} />
    <div style={{ height: "12px" }} />

    {/* tags */}
    {props.tags.map((el) => (
      <Tag key={el._id} style={{ minWidth: "3em", textAlign: "center" }}>
        {el.label}
      </Tag>
    ))}
  </div>
);

const ExpandCard: React.FC<
  CardProps & { visible: boolean; onSave: (save: BookmarkEditInputDto) => void }
> = (props) => {
  const [original, setOriginal] = useState(props.domain);
  const [note, setNote] = useState(props.note);

  const onSave = (s: boolean) => {
    //   save with new
    s &&
      props.onSave({
        _id: props._id,
        original: original,
        note,
      });

    //   save the same
    !s &&
      props.onSave({
        _id: props._id,
        original: props.original,
        note: props.note,
      });
  };

  return (
    <Modal
      closeIcon={<div />}
      visible={props.visible}
      onCancel={() => onSave(false)}
      onOk={() => onSave(true)}
    >
      <div style={styles.inputHeader}>
        <LinkOutlined />

        <input
          style={styles.inputUrl}
          value={original}
          onChange={(e) => setOriginal(() => e.target.value)}
        />
        <span style={{ fontWeight: "lighter" }}>{props.original}</span>
      </div>
      <div style={{ height: "12px" }} />

      <textarea
        style={styles.inputField}
        value={note}
        onChange={(e) => setNote(() => e.target.value)}
      />

      {/* tags */}
      <div style={{ height: "4px" }} />
      <Tags tags={props.tags} />
    </Modal>
  );
};

const Cards: React.FC<CardProps> = (props) => {
  const [expand, setExpand] = useState<boolean>(false);

  const onEdit = (data: BookmarkEditInputDto) => {
    setExpand(false);
    props.onEdit && props.onEdit(data);
  };

  const onClick = () => {
    setExpand(() => true);
  };

  return (
    <Card hoverable>
      <VisibleCard {...props} onClick={onClick} />
      {expand && <ExpandCard {...props} visible={expand} onSave={onEdit} />}
    </Card>
  );
};
export default Cards;
