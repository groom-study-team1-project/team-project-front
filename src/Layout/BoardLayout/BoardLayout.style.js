import styled, { css } from "styled-components";

export const Container = styled.div`
  display: flex;
  width: 100%;
`;

export const SidebarWrapper = styled.div`
  flex-shrink: 0;
`;

export const MainContentWrapper = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

export const Content = styled.div`
  display: flex;
  padding: 80px;
`;

export const RightSidebarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 176px;
`;

export const PopularCardWrapper = styled.div`
  margin-bottom: 40px;
`;
