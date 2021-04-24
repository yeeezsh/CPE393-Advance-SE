import styled from "styled-components";

export const AccountBadgeStyle = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.08);
  width: 120px;
  height: 100%;
  border-radius: 28px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-content: center;
  align-items: center;
`;

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

export const UsernameBadgeStyle = styled.p`
  display: flex;
  margin: auto;
  margin-left: 10px;
  width: 50px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
