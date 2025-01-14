import React, { useRef, useState, useEffect, useCallback } from "react";
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

function FreeBoard() {
  const [postItems, setPostItems] = useState([]);
  const [popularPosts, setPopularPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [lastPostId, setLastPostId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef(null);

  const categoryId = 1;
  const limit = 10;

  // 초기 인기 게시글 가져오기
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

  // 일반 게시글 가져오기
  const fetchData = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const { posts } = await fetchPostItems(categoryId, lastPostId);
      if (posts.length > 0) {
        setPostItems((prevPosts) => [...prevPosts, ...posts]);
        setLastPostId(posts[posts.length - 1].postId);
      }
      if (posts.length < limit) setHasMore(false);
    } catch (error) {
      console.error("게시글 가져오기 오류:", error);
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, lastPostId, categoryId]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          fetchData();
        }
      },
      { threshold: 1.0 }
    );

    if (observerRef.current) observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [fetchData, hasMore, loading]);

  useEffect(() => {
    fetchPopularPosts();
  }, [fetchPopularPosts]);

  // 검색 기능
  const filteredPosts = postItems.filter(
    (postItem) =>
      !searchTerm.trim() ||
      postItem.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (newSearchTerm) => setSearchTerm(newSearchTerm || "");

  return (
    <ContentWrapper>
      <Search onSearch={handleSearch} placeholder="게시글 검색" />
      <PopularPostSlider posts={popularPosts} />
      <PostCardWrapper>
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
        <div ref={observerRef} style={{ height: "1px" }} />
      </PostCardWrapper>
      {loading && (
        <SpinnerWrapper>
          <BarLoading />
        </SpinnerWrapper>
      )}
      {!hasMore && <EndMessage>모든 게시글을 불러왔습니다.</EndMessage>}
    </ContentWrapper>
  );
}

export default FreeBoard;
