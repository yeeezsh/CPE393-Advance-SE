import { LinkOutlined } from "@ant-design/icons";
import { Button, Card, Modal, Tag } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BookmarkEditInputDto } from "../../../../common/services/generate/generate-types";
import { Store } from "../../../../common/store";
import { BookmarkAction } from "../../../../common/store/bookmark";
import Tags, { TagType } from "../Tags/index";
import {
  CardInputUrlStyle,
  CardTextAreaStyle,
  InputHeaderStyle,
} from "./styled";

const { Meta } = Card;

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
  const dispatch = useDispatch();
  const [original, setOriginal] = useState(props.domain);
  const [note, setNote] = useState(props.note);

  const onSave = (s: boolean) => {
    dispatch(BookmarkAction.setUnSelectingBookmark());
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

  const onCancel = () => {
    dispatch(BookmarkAction.setUnSelectingBookmark());
    onSave(false);
  };

  const onOk = () => {
    onSave(true);
  };

  return (
    <Modal
      style={{ zIndex: 2 }}
      closeIcon={<div />}
      visible={props.visible}
      onCancel={onCancel}
      onOk={onOk}
      footer={[
        <Button style={{ marginRight: "50%" }} type="primary" danger>
          Delete
        </Button>,
        <Button onClick={onCancel}>Cancel</Button>,
        <Button type="primary" onClick={onOk}>
          Save
        </Button>,
      ]}
    >
      <InputHeaderStyle>
        <LinkOutlined />
        <CardInputUrlStyle
          value={original}
          onChange={(e) => setOriginal(() => e.target.value)}
        />
        <span style={{ fontWeight: "lighter" }}>{props.original}</span>
      </InputHeaderStyle>
      <div style={{ height: "12px" }} />

      <CardTextAreaStyle
        value={note}
        onChange={(e) => setNote(() => e.target.value)}
      />
      <div style={{ height: "4px" }} />
      <Tags tags={props.tags} />
    </Modal>
  );
};

const Cards: React.FC<CardProps> = (props) => {
  const [expand, setExpand] = useState<boolean>(false);
  const dispatch = useDispatch();
  const owner = useSelector((s: Store) => s.user.user._id);
  // const [getBookmark] = useGetBookmarkLazyQuery()

  const onEdit = (data: BookmarkEditInputDto) => {
    setExpand(false);
    props.onEdit && props.onEdit(data);
  };

  const onClick = () => {
    setExpand(() => true);
    dispatch(
      BookmarkAction.setSetlectBookmark({
        selecting: {
          _id: props._id,
          domain: props.domain,
          note: props.note,
          original: props.original,
          owner,
          tags: props.tags,
        },
      })
    );
  };

  return (
    <Card hoverable>
      <VisibleCard {...props} onClick={onClick} />
      {expand && <ExpandCard {...props} visible={expand} onSave={onEdit} />}
    </Card>
  );
};
export default Cards;
