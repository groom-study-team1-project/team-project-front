import styled, { css } from "styled-components";

export const Container = styled.div`
  display: flex;
  width: 100%;
`;

export const SidebarWrapper = styled.div`
  width: 320px;
  height: 100vh;
  flex-shrink: 0;
  position: sticky;
  top: 0;
`;

export const MainContentWrapper = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  background-color: rgba(255, 255, 255, 0.2);
  border-left: 1px solid rgb(255, 255, 255);
  position: sticky;
  top: 0;
`;

export const Content = styled.div`
  display: flex;
  padding: 80px 80px 0 80px;
  height: 100vh;
`;

export const RightSidebarWrapper = styled.div`
  position: sticky;
  display: flex;
  flex-direction: column;
  margin-top: 176px;
`;

export const PopularCardWrapper = styled.div`
  margin-bottom: 40px;
`;
