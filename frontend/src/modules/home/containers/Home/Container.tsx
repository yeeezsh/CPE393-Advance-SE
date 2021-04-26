import { Layout } from "antd";
import React from "react";
import styled from "styled-components";

const BodyStyle = styled.div`
  margin: 24px 16px;
  padding: 24px;
  min-height: 280px;
`;

const { Content } = Layout;

const Body: React.FC<{ collapsed: boolean; toggle: () => void }> = (props) => {
  return (
    <Layout>
      <BodyStyle>
        <Content>{props.children}</Content>
      </BodyStyle>
    </Layout>
  );
};

export default Body;
