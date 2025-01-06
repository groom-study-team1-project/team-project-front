import React, { useEffect, useRef, useState, useCallback } from "react";
import CommunityPostCard from "../../../components/Card/PostCard/CommunityPostCard/CommunityPostCard";
import {
  ContentWrapper,
  PostCardWrapper,
  EndMessage,
  SpinnerWrapper,
} from "../Board.style";
import Search from "../../../components/Common/Search/Search";
import { fetchPostItems } from "../../../services/api/postApi";
import { BarLoading } from "../../../components/Common/LodingSpinner";
import PopularPostSlider from "../../../components/Common/PopularPost/PopularPostSlider";

function QuestionBoard() {
  // 게시글, 검색어, 로딩 상태 등을 관리하는 상태 변수
  const [postItems, setPostItems] = useState([]);
  const [popularPosts, setPopularPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [lastPostId, setLastPostId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const isThrottleActive = useRef(false);
  const listRef = useRef(null);

  const categoryId = 3; // 게시글을 가져올 카테고리 ID
  const limit = 10; // 한 번에 가져올 게시글 개수 제한

  // 인기 게시글 가져오기
  const fetchPopularPosts = useCallback(async () => {
    try {
      let allPosts = [];
      let lastId = null;
      let more = true;

      while (more) {
        const { posts } = await fetchPostItems(categoryId, lastId);
        allPosts = [...allPosts, ...posts];

        if (posts.length < limit) {
          more = false;
        } else {
          lastId = posts[posts.length - 1].postId;
        }
      }

      const filteredPopularPosts = allPosts
          .sort((a, b) => b.countInfo.commentCount - a.countInfo.commentCount)
          .slice(0, 5); // Limit to 5 posts

      setPopularPosts(filteredPopularPosts);
    } catch (error) {
      console.error("인기 게시글 가져오기 오류:", error);
    }
  }, [categoryId, limit]);

  // API를 통해 데이터 가져오기
  const fetchData = useCallback(() => {
    if (loading || !hasMore || isThrottleActive.current) return;

    setLoading(true);
    isThrottleActive.current = true;

    setTimeout(async () => {
      try {
        const { posts } = await fetchPostItems(categoryId, lastPostId, limit);
        if (posts.length > 0) {
          setPostItems((prevPosts) => [...prevPosts, ...posts]);
          setLastPostId(posts[posts.length - 1].postId);
        }
        if (posts.length < limit) setHasMore(false);
      } catch (error) {
        console.error("질문 게시판 데이터 요청 오류:", error);
      } finally {
        setLoading(false);
        isThrottleActive.current = false;
      }
    }, 1000);
  }, [loading, hasMore, lastPostId, categoryId]);

  // 무한 스크롤 처리 로직
  const handleScroll = useCallback(
      (e) => {
        const { scrollTop, scrollHeight, clientHeight } = e.target;
        if (lastPostId === null) {
          fetchData();
          return;
        }
        if (scrollHeight - scrollTop <= clientHeight + 100 && !loading && hasMore) {
          fetchData();
        }
      },
      [fetchData, loading, hasMore, lastPostId]
  );

  // 스크롤 이벤트 리스너 추가 및 제거
  useEffect(() => {
    const listElement = listRef.current;
    if (listElement) {
      listElement.addEventListener("scroll", handleScroll);
      if (lastPostId === null) fetchData();
    }
    return () => listElement?.removeEventListener("scroll", handleScroll);
  }, [handleScroll, fetchData, lastPostId]);

  useEffect(() => {
    fetchPopularPosts();
  }, [fetchPopularPosts]);

  // 검색어를 기준으로 게시글 필터링
  const filteredPosts = postItems.filter((postItem) =>
      !searchTerm.trim() || postItem.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 검색어 상태 업데이트
  const handleSearch = (newSearchTerm) => setSearchTerm(newSearchTerm || "");

  return (
      <ContentWrapper>
        <Search onSearch={handleSearch} placeholder="질문 검색" />
        <PopularPostSlider posts={popularPosts} />
        <PostCardWrapper ref={listRef} style={{ overflowY: "auto" }}>
          {filteredPosts.map((postItem) => (
              <CommunityPostCard
                  key={postItem.postId}
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
          {loading && (
              <SpinnerWrapper>
                <BarLoading />
              </SpinnerWrapper>
          )}
          {!hasMore && <EndMessage>모든 게시글을 불러왔습니다.</EndMessage>}
        </PostCardWrapper>
      </ContentWrapper>
  );
}

export default QuestionBoard;
