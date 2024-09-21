import React, { useEffect, useState } from "react";
import { fetchNoticePostItems } from "../../../services/api";
import NoticePostCard from "../../../components/Card/PostCard/NoticePostCard/NoticePostCard";
import {
  BoardTitle,
  ContentWrapper,
  PostCardWrapper,
  SearchSortWrapper,
} from "../Board.style";
import Search from "../../../components/Common/Search/Search";
import SortOptionButton from "../../../components/Common/SortOptionButton/SortOptionButton";

function NoticeBoard() {
  const [postItems, setPostItems] = useState([]);

  useEffect(() => {
    fetchNoticePostItems()
      .then((data) => setPostItems(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <ContentWrapper>
      <BoardTitle>공지사항</BoardTitle>
      <SearchSortWrapper>
        <Search />
        <SortOptionButton />
      </SearchSortWrapper>
      <PostCardWrapper>
        {postItems.map((postItem) => (
          <NoticePostCard
            key={postItem.id}
            id={postItem.id}
            title={postItem.title}
            date={postItem.date}
            count={postItem.count}
          />
        ))}
      </PostCardWrapper>
    </ContentWrapper>
  );
}

export default NoticeBoard;