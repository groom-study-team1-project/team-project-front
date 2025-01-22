import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  width: 100%;
`;

export const SidebarWrapper = styled.div`
  width: 20%;
  max-width: 320px;
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
  overflow: hidden; /* 자식 요소가 벗어나지 않도록 설정 */
`;

export const RightSidebarWrapper = styled.div`
  position: sticky;
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* 자식 요소를 위쪽으로 정렬 */
`;

export const PopularCardWrapper = styled.div`
  margin-bottom: 40px;
`;
