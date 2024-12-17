import React, { useEffect, useRef, useState, useCallback } from "react";
import CommunityPostCard from "../../../components/Card/PostCard/CommunityPostCard/CommunityPostCard";
import {
  Title,
  BoardTitle,
  ContentWrapper,
  PostCardWrapper,
  SearchSortWrapper,
  EndMessage,
} from "../Board.style";
import Search from "../../../components/Common/Search/Search";
import SortOptionButton from "../../../components/Common/SortOptionButton/SortOptionButton";
import { fetchPostItems } from "../../../services/api/postApi";
import { BarLoading } from "../../../components/Common/LodingSpinner";

function FreeBoard() {
  const [postItems, setPostItems] = useState([]);
  const [lastPostId, setLastPostId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const isThrottleActive = useRef(false);
  const listRef = useRef(null);

  const categoryId = 1;
  const limit = 10;

  // fetchData 메모이제이션
  const fetchData = useCallback(() => {
    if (loading || !hasMore || isThrottleActive.current) return;

    setLoading(true);
    isThrottleActive.current = true;

    setTimeout(async () => {
      try {
        const { posts } = await fetchPostItems(categoryId, lastPostId);
        if (posts.length > 0) {
          setPostItems((prevPosts) => [...prevPosts, ...posts]);
          const newLastPostId = posts[posts.length - 1].postId;
          setLastPostId(newLastPostId);
        }

        if (posts.length < limit) {
          setHasMore(false);
        }
      } catch (error) {
        console.error("게시글 요청 중 오류:", error);
      } finally {
        setLoading(false);
        isThrottleActive.current = false;
      }
    }, 1000); // 1초 대기
  }, [loading, hasMore, lastPostId, categoryId]);

  // handleScroll 메모이제이션
  const handleScroll = useCallback(
    (e) => {
      const { scrollTop, scrollHeight, clientHeight } = e.target;

      if (lastPostId === null) {
        fetchData();
        return;
      }

      if (
        scrollHeight - scrollTop <= clientHeight + 100 &&
        !loading &&
        hasMore
      ) {
        fetchData();
      }
    },
    [fetchData, loading, hasMore, lastPostId]
  );

  useEffect(() => {
    const listElement = listRef.current;
    if (listElement) {
      listElement.addEventListener("scroll", handleScroll);
      if (lastPostId === null) fetchData(); // 첫 번째 API 호출
    }
    return () => {
      if (listElement) {
        listElement.removeEventListener("scroll", handleScroll);
      }
    };
  }, [handleScroll, fetchData, lastPostId]);

  return (
    <ContentWrapper>
      <BoardTitle>
        <Title>자유게시판</Title>
      </BoardTitle>
      <SearchSortWrapper>
        <Search />
        <SortOptionButton />
      </SearchSortWrapper>
      <PostCardWrapper
        ref={listRef}
        style={{ height: "750px", overflowY: "auto" }}
      >
        {postItems.map((postItem, index) => (
          <CommunityPostCard
            key={`${postItem.postId}-${index}`}
            id={postItem.postId}
            title={postItem.title}
            content={postItem.content}
            name={postItem.memberInfo.nickname}
            job={postItem.memberInfo.memberJob || "직업 정보 없음"}
            img={postItem.memberInfo.imageUrl}
            count={postItem.countInfo}
            thumbnail={postItem.thumbnail}
          />
        ))}
        {loading && <BarLoading />} {/* 로딩 중 로딩바 표시 */}
        {!hasMore && <EndMessage>모든 게시글을 불러왔습니다.</EndMessage>}
      </PostCardWrapper>
    </ContentWrapper>
  );
}

export default FreeBoard;
