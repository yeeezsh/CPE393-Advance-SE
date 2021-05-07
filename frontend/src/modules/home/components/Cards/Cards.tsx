import { Card, Tag } from "antd";
import React from "react";
import { TagType } from "../Tags/index";

const { Meta } = Card;

export interface CardProps {
  domain: string;
  tags: TagType;
  note: string;
}

const Cards: React.FC<CardProps> = (props) => {
  return (
    <>
      <Card hoverable>
        <Meta title={props.domain} description={props.note} />
        <div style={{ height: "12px" }} />

        {/* tags */}
        {props.tags.map((el) => (
          <Tag style={{ minWidth: "3em", textAlign: "center" }}>{el.label}</Tag>
        ))}
      </Card>
      ,
    </>
  );
};
export default Cards;
