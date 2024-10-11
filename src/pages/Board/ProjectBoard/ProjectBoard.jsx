import React, { useEffect, useState, useCallback } from "react";
import ProjectPostCard from "../../../components/Card/PostCard/ProjectPostCard/ProjectPostCard";
import {
  Title,
  BoardTitle,
  ContentWrapper,
  SearchSortWrapper,
} from "../Board.style";
import Search from "../../../components/Common/Search/Search";
import SortOptionButton from "../../../components/Common/SortOptionButton/SortOptionButton";
import { ProjectPostCardWrapper } from "./ProjectBoard.style";
import { fetchPostItems } from "../../../services/api/postApi";

function ProjectBoard() {
  const [postItems, setPostItems] = useState([]);
  const [lastPostId, setLastPostId] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      const { totalPostCount, posts } = await fetchPostItems(3, lastPostId);
      setPostItems(posts);
    };
    fetchData();
  }, []);

  return (
    <ContentWrapper>
      <BoardTitle>
        <Title>프로젝트 게시판</Title>
      </BoardTitle>
      <SearchSortWrapper>
        <Search />
        <SortOptionButton />
      </SearchSortWrapper>
      <ProjectPostCardWrapper>
        {postItems.map((postItem) => (
          <ProjectPostCard
            key={postItem.postId}
            id={postItem.postId}
            title={postItem.title}
            content={postItem.content}
            name={postItem.memberInfo.nickname}
            job={"IOS Developer"}
            count={postItem.countInfo}
            img={postItem.imgUrl}
          />
        ))}
      </ProjectPostCardWrapper>
    </ContentWrapper>
  );
}

export default ProjectBoard;
