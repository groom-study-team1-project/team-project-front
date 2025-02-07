import React, { useEffect, useRef, useState, useCallback } from "react";
import ProjectPostCard from "../../../components/Card/PostCard/ProjectPostCard/ProjectPostCard";
import {
  ContentWrapper,
  PostCardWrapper,
  EndMessage,
  SpinnerWrapper,
} from "../Board.style";
import Search from "../../../components/Common/Search/Search";
import { fetchProjectPosts } from "../../../services/api/postApi";
import { BarLoading } from "../../../components/Common/LodingSpinner";
import PopularPostSlider from "../../../components/Common/PopularPost/PopularPostSlider";
import { useDispatch, useSelector } from "react-redux";
import { setCategoryId } from "../../../store/category/categorySlice";

function ProjectBoard() {
  const [postItems, setPostItems] = useState([]);
  const [popularPosts, setPopularPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [lastPostId, setLastPostId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [postSortType, setPostSortType] = useState("LATEST");
  const observerRef = useRef(null);

  const categoryId = 2;
  const limit = 10;

  const { isMobile, isTablet } = useSelector((state) => state.screenSize);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCategoryId(categoryId));
  }, [dispatch, categoryId]);

  const fetchPopularPosts = useCallback(async () => {
    try {
      const { posts } = await fetchProjectPosts(categoryId, null, "HOT", 50);
      const filteredPopularPosts = posts
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
      const { posts } = await fetchProjectPosts(categoryId, lastPostId, postSortType, limit);
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

  const filteredPosts = postItems.filter((postItem) =>
      !searchTerm.trim() || postItem.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
      <ContentWrapper $isMobile={isMobile} $isTablet={isTablet}>
        <Search onSearch={handleSearch} placeholder="프로젝트 검색" />
        <PopularPostSlider posts={popularPosts} />
        <PostCardWrapper $isMobile={isMobile} $isTablet={isTablet} $projectPage={true}>
          {filteredPosts.map((postItem) => (
              <ProjectPostCard
                  key={postItem.postId}
                  id={postItem.postId}
                  title={postItem.title}
                  content={postItem.content}
                  name={postItem.authorInformation.nickname}
                  job={postItem.authorInformation.memberJob || "직업 정보 없음"}
                  profileImg={postItem.authorInformation.imageUrl}
                  postImgs={postItem.slideImageUrls || []}
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

export default ProjectBoard;
