import React from "react";
import {
  CommunityPostCardWrapper,
  ProjectPostCardWrapper,
} from "./PostLineLayout.style";
function PostLineLayout({ pageType, postCards }) {
  return (
    <>
      {pageType === "projects" ? (
        <ProjectPostCardWrapper>
          {postCards.map((card, index) => (
            <div key={index} style={{ paddingBottom: "40px" }}>
              {card}
            </div>
          ))}
        </ProjectPostCardWrapper>
      ) : (
        <CommunityPostCardWrapper>
          {postCards.map((card, index) => (
            <div key={index} style={{ paddingBottom: "40px" }}>
              {card}
            </div>
          ))}
        </CommunityPostCardWrapper>
      )}
    </>
  );
}
export default PostLineLayout;
