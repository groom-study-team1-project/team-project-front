import React, { useEffect, useState } from "react";
import {
  Title,
  BoardTitle,
  ContentWrapper,
  PostCardWrapper,
  SearchSortWrapper,
  LastPostEnd,
} from "../Board.style";
import Search from "../../../components/Common/Search/Search";
import SortOptionButton from "../../../components/Common/SortOptionButton/SortOptionButton";
import { useInView } from "react-intersection-observer";
import { fetchPostItems } from "../../../services/api/postApi";
import NoticePostCard from "../../../components/Card/PostCard/NoticePostCard/NoticePostCard";
import { NoticePostCardWrapper } from "./NoticeBoard.style";

function NoticeBoard() {
  const [postItems, setPostItems] = useState([]);
  const [lastPostId, setLastPostId] = useState(10);
  const [visibleItems, setVisibleItems] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  // const itemsPerPage = 4;
  // const { ref, inView } = useInView({
  //   threshold: 1,
  //   triggerOnce: false,
  // });

  // useEffect(() => {
  //   const fetchData = async () => {
  //     console.log("Fetching initial posts...");
  //     try {
  //       const allPosts = await fetchPostItems();

  //       setPostItems(allPosts);
  //       setVisibleItems(allPosts.slice(0, itemsPerPage));

  //       if (allPosts.length <= itemsPerPage) {
  //         setHasMore(false);
  //       }
  //     } catch (err) {
  //       console.log("Error fetching posts:", err);
  //     }
  //   };
  //   fetchData();
  // }, []);

  // useEffect(() => {
  //   if (inView && hasMore && !isFetching) {
  //     setIsFetching(true);
  //     const startIndex = page * itemsPerPage;
  //     const endIndex = startIndex + itemsPerPage;

  //     const newPosts = postItems.slice(startIndex, endIndex);

  //     if (newPosts.length > 0) {
  //       setVisibleItems((prevItems) => [...prevItems, ...newPosts]);
  //       setPage((prevPage) => prevPage + 1);
  //     } else {
  //       setHasMore(false); // 더 이상 불러올 데이터가 없을 때
  //     }

  //     setTimeout(() => {
  //       setIsFetching(false);
  //     }, 500);
  //   }
  // }, [inView, hasMore, isFetching, page, postItems]);

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

      {/* {hasMore ? (
        <LastPostEnd>Loading more...</LastPostEnd>
      ) : (
        <LastPostEnd>더 이상의 포스트가 없습니다.</LastPostEnd>
      )} */}
    </ContentWrapper>
  );
}

export default NoticeBoard;
