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
import { useInView } from "react-intersection-observer";

function NoticeBoard() {
  const [postItems, setPostItems] = useState([]); // 모든 포스트 데이터
  const [visibleItems, setVisibleItems] = useState([]); // 화면에 보여줄 데이터
  const [page, setPage] = useState(1); // 현재 페이지
  const [hasMore, setHasMore] = useState(true); // 추가 데이터가 있는지 여부
  const [isFetching, setIsFetching] = useState(false); // 현재 데이터를 로딩 중인지 여부
  const itemsPerPage = 10; // 한 번에 불러올 포스트 수
  const { ref, inView } = useInView({
    threshold: 1, // 감시 대상이 100% 보이면 트리거
    triggerOnce: false, // 여러 번 트리거 가능
  });

  // 처음 데이터를 불러옴
  useEffect(() => {
    const fetchData = async () => {
      console.log("Fetching initial posts...");
      try {
        const allPosts = await fetchNoticePostItems();
        console.log("Fetched posts:", allPosts);

        setPostItems(allPosts);
        setVisibleItems(allPosts.slice(0, itemsPerPage));
        console.log("Initial visible items:", allPosts.slice(0, itemsPerPage));

        if (allPosts.length <= itemsPerPage) {
          setHasMore(false);
          console.log("No more posts to load after initial load");
        }
      } catch (err) {
        console.log("Error fetching posts:", err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (inView && hasMore && !isFetching) {
      console.log("InView detected, loading more posts...");
      setIsFetching(true);
      const startIndex = page * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;

      console.log(`Fetching posts for page ${page}`);
      console.log(`Start Index: ${startIndex}, End Index: ${endIndex}`);

      const newPosts = postItems.slice(startIndex, endIndex);

      if (newPosts.length > 0) {
        console.log("New posts to add:", newPosts);
        setVisibleItems((prevItems) => [...prevItems, ...newPosts]);
        setPage((prevPage) => {
          console.log("New page:", prevPage + 1);
          return prevPage + 1;
        });
      } else {
        console.log("No more posts to load.");
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

      {hasMore && (
        <div ref={ref} style={{ padding: "20px", textAlign: "center" }}>
          Loading more...
        </div>
      )}
    </ContentWrapper>
  );
}

export default NoticeBoard;
