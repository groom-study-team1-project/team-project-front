import React, { useEffect, useState } from "react";
import { fetchNoticePostItems } from "../../../services/api/api";
import NoticePostCard from "../../../components/Card/PostCard/NoticePostCard/NoticePostCard";
import {
  Title,
  BoardTitle,
  ContentWrapper,
  SearchSortWrapper,
} from "../Board.style";
import Search from "../../../components/Common/Search/Search";
import SortOptionButton from "../../../components/Common/SortOptionButton/SortOptionButton";
import { NoticePostCardWrapper } from "./NoticeBoard.style";

function NoticeBoard() {
  const [postItems, setPostItems] = useState([]);

  useEffect(() => {
    fetchNoticePostItems()
      .then((data) => setPostItems(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <ContentWrapper>
      <BoardTitle>
        <Title>공지사항</Title>
      </BoardTitle>
      <SearchSortWrapper>
        <Search />
        <SortOptionButton />
      </SearchSortWrapper>
      <NoticePostCardWrapper>
        {postItems.map((postItem) => (
          <NoticePostCard
            key={postItem.id}
            id={postItem.id}
            title={postItem.title}
            date={postItem.date}
            count={postItem.count}
          />
        ))}
      </NoticePostCardWrapper>
    </ContentWrapper>
  );
}

export default NoticeBoard;
