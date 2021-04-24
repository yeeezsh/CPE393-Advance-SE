import React from "react";
import styled from "styled-components";

export const CharacterBadgeStyle = styled.div`
  padding: 4px;
  display: flex;

  p {
    display: flex;
    color: white;
    font-weight: bold;
    align-items: center;
    justify-content: center;
    width: 2.6em;
    height: 2.6em;
    background: orange;
    border-radius: 50%;
    margin: auto;
    margin-right: 4px;
  }
`;

export type CharacterBadgeProps = { style?: React.CSSProperties };

const CharacterBadge: React.FC<CharacterBadgeProps> = (props) => {
  return (
    <CharacterBadgeStyle style={props.style}>
      <p>{props.children}</p>
    </CharacterBadgeStyle>
  );
};

export default CharacterBadge;
