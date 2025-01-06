import React, { useEffect, useRef, useState, useCallback } from "react";
import ProjectPostCard from "../../../components/Card/PostCard/ProjectPostCard/ProjectPostCard";
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

function ProjectBoard() {
  const [postItems, setPostItems] = useState([]);
  const [popularPosts, setPopularPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [lastPostId, setLastPostId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const isThrottleActive = useRef(false);
  const listRef = useRef(null);

  const categoryId = 2;
  const limit = 10;

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
        console.error("프로젝트 게시판 데이터 요청 오류:", error);
      } finally {
        setLoading(false);
        isThrottleActive.current = false;
      }
    }, 1000);
  }, [loading, hasMore, lastPostId, categoryId]);

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

  const filteredPosts = postItems.filter((postItem) =>
      !searchTerm.trim() ||
      postItem.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (newSearchTerm) => setSearchTerm(newSearchTerm || "");

  return (
      <ContentWrapper>
        <Search onSearch={handleSearch} placeholder="프로젝트 검색" />
        <PopularPostSlider posts={popularPosts} />
        <PostCardWrapper ref={listRef} style={{ overflowY: "auto" }} $projectPage={true}>
          {filteredPosts.map((postItem) => (
              <ProjectPostCard
                  key={postItem.postId}
                  id={postItem.postId}
                  title={postItem.title}
                  content={postItem.content}
                  name={postItem.memberInfo.nickname}
                  job={postItem.memberInfo.memberJob || "직업 정보 없음"}
                  profileImg={postItem.memberInfo.imageUrl} // Profile image
                  postImgs={postItem.imageUrls || []} // Post images
                  count={postItem.countInfo}
              />
          ))}
          {loading && (
              <SpinnerWrapper $projectPage={true}>
                <BarLoading />
              </SpinnerWrapper>
          )}
          {!hasMore && <EndMessage $projectPage={true}>모든 게시글을 불러왔습니다.</EndMessage>}
        </PostCardWrapper>
      </ContentWrapper>
  );
}

export default ProjectBoard;
