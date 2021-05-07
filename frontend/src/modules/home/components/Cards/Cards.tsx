
import { Button, Card, Input, Row, Tag } from "antd";
import React, { useState } from "react";
import Tags, { TagType } from "../Tags/index";

const { Meta } = Card;
const { TextArea } = Input;

export interface CardProps {
  domain: string;
  tags: TagType;
  note: string;
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
  CardProps & { visible: boolean; onSave: () => void }
> = (props) => {
  return (
    <div>
      <Input value={props.domain} />
      <div style={{ height: "12px" }} />

      <TextArea rows={2} value={props.note} />

      {/* tags */}
      <Tags tags={props.tags} />
      <div style={{ height: "4px" }} />

      <Row justify="end">
        <Button onClick={() => props.onSave()}>Save</Button>
      </Row>
    </div>
  );
};

const Cards: React.FC<CardProps> = (props) => {
  const [expand, setExpand] = useState<boolean>(false);

  const onSave = () => {
    setExpand(false);
    console.log("on save", expand);
  };

  const onClick = () => {
    setExpand(() => true);
  };

  return (
    <Card hoverable>
      {!expand && <VisibleCard {...props} onClick={onClick} />}
      {expand && <ExpandCard {...props} visible={expand} onSave={onSave} />}
    </Card>
  );
};
export default Cards;