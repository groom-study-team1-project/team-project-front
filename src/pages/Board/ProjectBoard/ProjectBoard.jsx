import React, { useEffect, useState } from "react";
import { fetchPostItems } from "../../../services/api";
import ProjectPostCard from "../../../components/Card/PostCard/ProjectPostCard/ProjectPostCard";
import {
  BoardTitle,
  ContentWrapper,
  PostCardWrapper,
  SearchSortWrapper,
} from "../Board.style";
import Search from "../../../components/Common/Search/Search";
import SortOptionButton from "../../../components/Common/SortOptionButton/SortOptionButton";

function ProjectBoard() {
  const [postItems, setPostItems] = useState([]);

  useEffect(() => {
    fetchPostItems()
      .then((data) => setPostItems(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <ContentWrapper>
      <BoardTitle>프로젝트 게시판</BoardTitle>
      <SearchSortWrapper>
        <Search />
        <SortOptionButton />
      </SearchSortWrapper>
      <PostCardWrapper>
        {postItems.map((postItem) => (
          <ProjectPostCard
            key={postItem.id}
            id={postItem.id}
            title={postItem.title}
            content={postItem.content}
            name={postItem.name}
            job={postItem.job}
            count={postItem.count}
          />
        ))}
      </PostCardWrapper>
    </ContentWrapper>
  );
}

export default ProjectBoard;
