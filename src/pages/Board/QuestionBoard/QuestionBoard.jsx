import React, { useEffect, useState } from "react";
import { fetchPostItems } from "../../../services/api/api";
import CommunityPostCard from "../../../components/Card/PostCard/CommunityPostCard/CommunityPostCard";
import {
  Title,
  BoardTitle,
  ContentWrapper,
  PostCardWrapper,
  SearchSortWrapper,
} from "../Board.style";
import Search from "../../../components/Common/Search/Search";
import SortOptionButton from "../../../components/Common/SortOptionButton/SortOptionButton";

function QuestionBoard() {
  const [postItems, setPostItems] = useState([]);

  useEffect(() => {
    fetchPostItems()
      .then((data) => setPostItems(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <ContentWrapper>
      <BoardTitle>
        <Title>질문게시판</Title>
      </BoardTitle>
      <SearchSortWrapper>
        <Search />
        <SortOptionButton />
      </SearchSortWrapper>
      <PostCardWrapper>
        {postItems.map((postItem) => (
          <CommunityPostCard
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
      </PostCardWrapper>
    </ContentWrapper>
  );
}

export default QuestionBoard;
