import React, { useEffect, useState } from "react";
import { fetchPostItems } from "../../../services/api";
import CommunityPostCard from "../../../components/Card/PostCard/CommunityPostCard/CommunityPostCard";
import {
  BoardTitle,
  ContentWrapper,
  PostCardWrapper,
  SearchSortWrapper,
} from "../Board.style";
import Search from "../../../components/Common/Search/Search";
import SortOptionButton from "../../../components/Common/SortOptionButton/SortOptionButton";

function FreeBoard() {
  const [postItems, setPostItems] = useState([]);

  useEffect(() => {
    fetchPostItems()
      .then((data) => setPostItems(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <ContentWrapper>
      <BoardTitle>자유게시판</BoardTitle>
      <SearchSortWrapper>
        <Search />
        <SortOptionButton />
      </SearchSortWrapper>
      <PostCardWrapper>
        {postItems.map((postItem) => (
          <CommunityPostCard
            key={postItem.id}
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

export default FreeBoard;
