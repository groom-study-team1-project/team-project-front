import React, { useEffect, useState } from "react";
import { fetchPostItems } from "../../../services/api";
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

function ProjectBoard() {
  const [postItems, setPostItems] = useState([]);

  useEffect(() => {
    fetchPostItems()
      .then((data) => setPostItems(data))
      .catch((err) => console.log(err));
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
            key={postItem.id}
            id={postItem.id}
            title={postItem.title}
            content={postItem.content}
            name={postItem.author.name}
            job={postItem.author.job}
            email={postItem.author.email}
            count={postItem.count}
            img={postItem.imgUrl}
          />
        ))}
      </ProjectPostCardWrapper>
    </ContentWrapper>
  );
}

export default ProjectBoard;
