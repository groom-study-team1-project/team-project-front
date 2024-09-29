import React, { useEffect, useState } from "react";
import { fetchNoticePostItems } from "../../../services/api";
import NoticePostCard from "../../../components/Card/PostCard/NoticePostCard/NoticePostCard";
import {
  BoardTitle,
  ContentWrapper,
  PostCardWrapper,
  SearchSortWrapper,
  LastPostEnd,
} from "../Board.style";
import Search from "../../../components/Common/Search/Search";
import SortOptionButton from "../../../components/Common/SortOptionButton/SortOptionButton";
import { useInView } from "react-intersection-observer";

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allPosts = await fetchNoticePostItems();

        setPostItems(allPosts);
        setVisibleItems(allPosts.slice(0, itemsPerPage));

        if (allPosts.length <= itemsPerPage) {
          setHasMore(false);
        }
      } catch (err) {
        console.log("Error fetching posts:", err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (inView && hasMore && !isFetching) {
      setIsFetching(true);
      const startIndex = page * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const newPosts = postItems.slice(startIndex, endIndex);

      if (newPosts.length > 0) {
        setVisibleItems((prevItems) => [...prevItems, ...newPosts]);
        setPage((prevPage) => {
          return prevPage + 1;
        });
      } else {
        setHasMore(false);
      }

      setTimeout(() => {
        setIsFetching(false);
      }, 500);
    }
  }, [inView, hasMore, isFetching, page, postItems]);

  return (
    <ContentWrapper>
      <BoardTitle>공지사항</BoardTitle>
      <SearchSortWrapper>
        <Search />
        <SortOptionButton />
      </SearchSortWrapper>
      <PostCardWrapper>
        {visibleItems.map((postItem) => (
          <NoticePostCard
            key={postItem.id}
            id={postItem.id}
            title={postItem.title}
            date={postItem.date}
            count={postItem.count}
          />
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
