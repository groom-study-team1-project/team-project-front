import React, { useEffect, useState } from "react";
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
import { fetchPostItems } from "../../../services/api/postApi";

function QuestionBoard() {
  const [postItems, setPostItems] = useState([]);
  const [lastPostId, setLastPostId] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      const { totalPostCount, posts } = await fetchPostItems(3, lastPostId); // API 호출
      setPostItems(posts);
    };
    fetchData();
  }, []);

  return (
    <ContentWrapper>
      <BoardTitle>
        <Title>질문 게시판</Title>
      </BoardTitle>
      <SearchSortWrapper>
        <Search />
        <SortOptionButton />
      </SearchSortWrapper>
      <PostCardWrapper>
        {postItems.map((postItem) => (
          <CommunityPostCard
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
      </PostCardWrapper>
    </ContentWrapper>
  );
}

export default QuestionBoard;
