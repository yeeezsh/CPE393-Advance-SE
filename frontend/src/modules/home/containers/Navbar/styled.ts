import styled from "styled-components";

export const NavbarStyle = styled.div`
  display: flex;
  background-color: white;
  position: absolute;
  height: 54px;
  align-items: center;
`;

export const NavbarStyleRight = styled.div`
  display: flex;
  background-color: white;
  position: absolute;
  width: 50%;
  left: 50%;
  height: 54px;
  align-items: center;
  justify-content: flex-end;
`;

export const LogoStyle = styled.div`
  margin-left: 32px;
  width: 84px;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
`;

export const SearchBarContainer = styled.div`
  display: flex;
  margin-left: 25vw;
  min-width: 45vw;
  align-items: center;
  justify-content: center;
  transform: translateX(-25%);
  z-index: 1;
`;
