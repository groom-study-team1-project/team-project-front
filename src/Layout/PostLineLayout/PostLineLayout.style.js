import styled from "styled-components";

export const CommunityPostCardWrapper = styled.div`
  width: 990px;
  max-width: 1190px;
  margin-left: 80px;
  padding-top: 40px;
  margin-right: 150px;
`;

export const ProjectPostCardWrapper = styled(CommunityPostCardWrapper)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
`;
