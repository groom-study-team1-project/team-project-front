import React, { useEffect, useState } from "react";
import { fetchNoticePostItems } from "../../../services/api/api";
import NoticePostCard from "../../../components/Card/PostCard/NoticePostCard/NoticePostCard";
import {
  Title,
  BoardTitle,
  ContentWrapper,
  SearchSortWrapper,
  LastPostEnd,
  PostCardWrapper, // PostCardWrapper를 Board.style에서 가져옴
} from "../Board.style";
import Search from "../../../components/Common/Search/Search";
import SortOptionButton from "../../../components/Common/SortOptionButton/SortOptionButton";
import { useInView } from "react-intersection-observer";
import { NoticePostCardWrapper } from "./NoticeBoard.style"; // NoticePostCardWrapper가 프로젝트 내 정의된 것으로 가정

function NoticeBoard() {
  const [postItems, setPostItems] = useState([]);
  const [visibleItems, setVisibleItems] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const itemsPerPage = 10;
  const { ref, inView } = useInView({
    threshold: 1,
    triggerOnce: false,
  });

  // 처음 데이터를 불러옴
  useEffect(() => {
    const fetchData = async () => {
      try {
        const allPosts = await fetchNoticePostItems();

        setPostItems(allPosts); // 전체 데이터를 저장
        setVisibleItems(allPosts.slice(0, itemsPerPage)); // 처음 itemsPerPage 개만 표시

        if (allPosts.length <= itemsPerPage) {
          setHasMore(false); // 더 이상 불러올 데이터가 없을 때
        }
      } catch (err) {
        console.log("Error fetching posts:", err);
      }
    };
    fetchData();
  }, []);

  // 무한 스크롤을 처리하는 함수
  useEffect(() => {
    if (inView && hasMore && !isFetching) {
      setIsFetching(true);
      const startIndex = page * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;

      const newPosts = postItems.slice(startIndex, endIndex);
      if (newPosts.length > 0) {
        setVisibleItems((prevItems) => [...prevItems, ...newPosts]);
        setPage((prevPage) => prevPage + 1);
      } else {
        setHasMore(false);
      }

      setTimeout(() => {
        setIsFetching(false);
      }, 500); // 딜레이 추가
    }
  }, [inView, hasMore, isFetching, page, postItems]);

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
        {visibleItems.map((postItem) => (
          <NoticePostCardWrapper key={postItem.id}>
            <NoticePostCard
              id={postItem.id}
              title={postItem.title}
              date={postItem.date}
              count={postItem.count}
            />
          </NoticePostCardWrapper>
        ))}
      </PostCardWrapper>

      {hasMore ? (
        <LastPostEnd ref={ref}>Loading more...</LastPostEnd>
      ) : (
        <LastPostEnd>더 이상의 포스트가 없습니다.</LastPostEnd>
      )}
    </ContentWrapper>
  );
}

export default NoticeBoard;
