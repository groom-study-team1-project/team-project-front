import React, { useEffect, useRef, useState, useCallback } from "react";
import ProjectPostCard from "../../../components/Card/PostCard/ProjectPostCard/ProjectPostCard";
import {
  Title,
  BoardTitle,
  ContentWrapper,
  SearchSortWrapper,
  EndMessage,
} from "../Board.style";
import Search from "../../../components/Common/Search/Search";
import SortOptionButton from "../../../components/Common/SortOptionButton/SortOptionButton";
import { ProjectPostCardWrapper } from "./ProjectBoard.style";
import { fetchPostItems } from "../../../services/api/postApi";
import { BarLoading } from "../../../components/Common/LodingSpinner";

function ProjectBoard() {
  const [postItems, setPostItems] = useState([]);
  const [lastPostId, setLastPostId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const listRef = useRef(null);

  const categoryId = 2;
  const limit = 10;

  const fetchData = useCallback(() => {
    if (loading || !hasMore) return;

    setLoading(true);
    setTimeout(async () => {
      try {
        const { posts } = await fetchPostItems(categoryId, lastPostId, limit);
        if (posts.length > 0) {
          setPostItems((prev) => [...prev, ...posts]);
          setLastPostId(posts[posts.length - 1].postId);
        }
        if (posts.length < limit) setHasMore(false);
      } catch (error) {
        console.error("프로젝트 게시판 데이터 요청 오류:", error);
      } finally {
        setLoading(false);
      }
    }, 1000);
  }, [loading, hasMore, lastPostId]);

  const handleScroll = useCallback((e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    if (scrollHeight - scrollTop <= clientHeight + 100 && !loading && hasMore) {
      fetchData();
    }
  }, [fetchData, loading, hasMore]);

  useEffect(() => {
    const listElement = listRef.current;
    if (listElement) {
      listElement.addEventListener("scroll", handleScroll);
      if (lastPostId === null) fetchData();
    }
    return () => listElement && listElement.removeEventListener("scroll", handleScroll);
  }, [handleScroll, fetchData, lastPostId]);

  return (
      <ContentWrapper>
        <BoardTitle>
          <Title>프로젝트 게시판</Title>
        </BoardTitle>
        <SearchSortWrapper>
          <Search />
          <SortOptionButton />
        </SearchSortWrapper>
        <ProjectPostCardWrapper ref={listRef} style={{ height: "750px", overflowY: "auto" }}>
          {postItems.map((postItem, index) => (
              <ProjectPostCard
                  key={`${postItem.postId}-${index}`}
                  id={postItem.postId}
                  title={postItem.title}
                  content={postItem.content}
                  name={postItem.memberInfo.nickname}
                  job={postItem.memberInfo.memberJob || "직업 정보 없음"}
                  img={postItem.memberInfo.imageUrl}
                  count={postItem.countInfo}
                  imgUrls={postItem.imageUrls || []}
              />
          ))}
          {loading && <BarLoading />}
          {!hasMore && <EndMessage>모든 게시글을 불러왔습니다.</EndMessage>}
        </ProjectPostCardWrapper>
      </ContentWrapper>
  );
}

export default ProjectBoard;
