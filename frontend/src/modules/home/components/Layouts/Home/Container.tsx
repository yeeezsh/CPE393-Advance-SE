import { Layout } from "antd";
import React from "react";
import styled from "styled-components";

const ContentStyle = styled.div`
  margin: 24px 16px;
  padding: 24px;
  min-height: 280px;
`;

const { Content } = Layout;

const Container: React.FC<{ collapsed: boolean; toggle: () => void }> = (
  props
) => {
  return (
    <Layout>
      <ContentStyle>
        <Content>{props.children}</Content>
      </ContentStyle>
    </Layout>
  );
};

export default Container;
