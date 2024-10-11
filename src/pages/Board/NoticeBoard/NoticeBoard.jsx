import React, { useEffect, useState } from "react";
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
import NoticePostCard from "../../../components/Card/PostCard/NoticePostCard/NoticePostCard";
import { NoticePostCardWrapper } from "./NoticeBoard.style";
import { useDispatch } from "react-redux";
import { setAllPostItems } from "../../../store/post/postSlice";
function NoticeBoard() {
  const [postItems, setPostItems] = useState([]);
  const [lastPostId, setLastPostId] = useState(10);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const { totalPostCount, posts } = await fetchPostItems(3, lastPostId); // API 호출
      setPostItems(posts);

      dispatch(setAllPostItems({ posts: posts }));
    };
    fetchData();
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
      <PostCardWrapper>
        {postItems.map((postItem) => (
          <NoticePostCardWrapper key={postItem.id}>
            <NoticePostCard
              id={postItem.postId}
              title={postItem.title}
              date={postItem.createdAt.split(" ")[0]}
              count={postItem.countInfo}
            />
          </NoticePostCardWrapper>
        ))}
      </PostCardWrapper>
    </ContentWrapper>
  );
}

export default NoticeBoard;
