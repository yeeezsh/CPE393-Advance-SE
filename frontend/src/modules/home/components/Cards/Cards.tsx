import { Button, Card, Input, Tag } from "antd";
import React, { useState } from "react";
import Tags, { TagType } from "../Tags/index";

const { Meta } = Card;

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

      {/* tags */}
      <Tags tags={props.tags} />
      <Button onClick={() => props.onSave()}>Save</Button>
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
