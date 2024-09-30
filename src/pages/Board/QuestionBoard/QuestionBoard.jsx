import React, { useEffect, useState } from "react";
import CommunityPostCard from "../../../components/Card/PostCard/CommunityPostCard/CommunityPostCard";
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

function QuestionBoard() {
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

      {/* {hasMore ? (
        <LastPostEnd>Loading more...</LastPostEnd>
      ) : (
        <LastPostEnd>더 이상의 포스트가 없습니다.</LastPostEnd>
      )} */}
    </ContentWrapper>
  );
}

export default QuestionBoard;
