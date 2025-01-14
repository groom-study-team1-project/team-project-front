import React, { useEffect, useRef, useState, useCallback } from "react";
import NoticePostCard from "../../../components/Card/PostCard/NoticePostCard/NoticePostCard";
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
import { useDispatch, useSelector } from "react-redux";
import { setCategoryId } from "../../../store/category/categorySlice";

function NoticeBoard() {
  const [postItems, setPostItems] = useState([]);
  const [popularPosts, setPopularPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [lastPostId, setLastPostId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [postSortType, setPostSortType] = useState("LATEST");
  const observerRef = useRef(null);

  const categoryId = 4;
  const limit = 10;

  const { isMobile, isTablet } = useSelector((state) => state.screenSize);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCategoryId(categoryId));
  }, [dispatch, categoryId]);

  const fetchPopularPosts = useCallback(async () => {
    try {
      const { posts } = await fetchPostItems(categoryId, null, "HOT", 50);
      const filteredPopularPosts = posts
        .sort((a, b) => b.commentCount - a.commentCount)
        .slice(0, 5); // Limit to 5 posts
      setPopularPosts(filteredPopularPosts);
    } catch (error) {
      console.error("Error fetching popular posts:", error);
    }
  }, [categoryId]);

  const fetchData = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const { posts } = await fetchPostItems(
        categoryId,
        lastPostId,
        postSortType,
        limit
      );
      if (posts.length > 0) {
        setPostItems((prevPosts) => [...prevPosts, ...posts]);
        setLastPostId(posts[posts.length - 1].postId);
      }
      if (posts.length < limit) setHasMore(false);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, lastPostId, categoryId, limit, postSortType]);

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

  const handleSearch = (newSearchTerm, newPostSortType) => {
    setSearchTerm(newSearchTerm || "");
    setPostSortType(newPostSortType || "LATEST");
    setPostItems([]);
    setLastPostId(null);
    setHasMore(true);
  };

  const filteredPosts = postItems.filter(
    (postItem) =>
      !searchTerm.trim() ||
      postItem.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <ContentWrapper $isMobile={isMobile} $isTablet={isTablet}>
      <Search onSearch={handleSearch} placeholder="공지사항 검색" />
      <PopularPostSlider posts={popularPosts} />
      <PostCardWrapper
        $isMobile={isMobile}
        $isTablet={isTablet}
        $noticePage={true}
      >
        {filteredPosts.map((postItem) => (
          <NoticePostCard
            key={postItem.postId}
            id={postItem.postId}
            title={postItem.title}
            date={new Date(postItem.createdAt).toLocaleString("ko-KR")}
            count={{
              viewCount: postItem.viewCount,
              likeCount: postItem.likeCount,
              commentCount: postItem.commentCount,
            }}
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

export default NoticeBoard;
