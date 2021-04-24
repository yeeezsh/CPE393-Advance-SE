import styled from "styled-components";

export const AccountBadgeStyle = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.08);
  width: 120px;
  height: 100%;
  border-radius: 0.5em;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-content: center;
  align-items: center;
  cursor: pointer;

  .overlay {
    margin-top: 385px;
    padding: 10px;
    justify-content: center;
    align-items: flex-start;
    border: 1px solid rgba(0, 0, 0, 0.08);
    width: 320px;
    height: 320px;
    position: absolute;
    right: 0;
    z-index: 2;
    background: white;
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
