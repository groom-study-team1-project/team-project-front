import React, { useRef, useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux"; // Redux 상태 사용
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
import { setCategoryId } from "../../../store/category/categorySlice";

function FreeBoard() {
  const [postItems, setPostItems] = useState([]);
  const [popularPosts, setPopularPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [lastPostId, setLastPostId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [postSortType, setPostSortType] = useState("LATEST");
  const observerRef = useRef(null);

  const categoryId = 1;
  const limit = 10;

  const { isMobile, isTablet } = useSelector((state) => state.screenSize);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCategoryId(categoryId));
  }, [dispatch, categoryId]);

  const fetchPopularPosts = useCallback(async () => {
    try {

      const { posts } = await fetchPostItems(categoryId, null, "HOT", 50);
      const filteredPopularPosts = posts.slice(0, 5);

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
      <Search onSearch={handleSearch} placeholder="게시글 검색" />
      <PopularPostSlider posts={popularPosts} />
      <PostCardWrapper $isMobile={isMobile} $isTablet={isTablet}>
        {filteredPosts.map((postItem) => (
          <CommunityPostCard
            key={postItem.postId}
            id={postItem.postId}
            title={postItem.title}
            content={postItem.content}
            name={postItem.authorInformation.nickname}
            job={postItem.authorInformation.memberJob || "직업 정보 없음"}
            img={postItem.authorInformation.imageUrl}
            count={{
              viewCount: postItem.viewCount,
              likeCount: postItem.likeCount,
              commentCount: postItem.commentCount,
            }}
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
