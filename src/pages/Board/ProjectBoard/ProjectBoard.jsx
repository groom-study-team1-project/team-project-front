import React, { useEffect, useState, useRef } from "react";
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
import { useDispatch } from "react-redux";
import { setAllPostItems } from "../../../store/post/postSlice";
import { BarLoading } from "../../../components/Common/LodingSpinner";

function ProjectBoard() {
  const [postItems, setPostItems] = useState([]);
  const [lastPostIdByCategory, setLastPostIdByCategory] = useState(Number.MAX_SAFE_INTEGER);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const isThrottleActive = useRef(false);
  const listRef = useRef(null);

  const dispatch = useDispatch();
  const categoryId = 2;
  const limit = 10;

  const fetchData = async () => {
    if (loading || !hasMore || isThrottleActive.current) return;
    setLoading(true);
    isThrottleActive.current = true;

    setTimeout(async () => {
      try {
        const { posts } = await fetchPostItems(
            categoryId,
            lastPostIdByCategory
        );
        const filteredPosts = posts.filter(
            (post) => post.categoryId === categoryId
        );
        if (filteredPosts.length > 0) {
          setPostItems((prevPosts) => [...prevPosts, ...filteredPosts]);
          const newLastPostId = filteredPosts[filteredPosts.length - 1].postId;
          setLastPostIdByCategory(newLastPostId);
          dispatch(setAllPostItems([...postItems, ...filteredPosts]));
        }
        if (filteredPosts.length < limit) {
          setHasMore(false);
        }
      } catch (error) {
      } finally {
        setLoading(false);
        isThrottleActive.current = false;
      }
    }, 1000);
  };

  useEffect(() => {
    fetchData();
  }, [dispatch]);

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    if (scrollHeight - scrollTop <= clientHeight + 100 && !loading && hasMore) {
      fetchData();
    }
  };

  useEffect(() => {
    const listElement = listRef.current;
    if (listElement) {
      listElement.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (listElement) {
        listElement.removeEventListener("scroll", handleScroll);
      }
    };
  }, [lastPostIdByCategory, loading, hasMore]);

  return (
      <ContentWrapper>
        <BoardTitle>
          <Title>프로젝트 게시판</Title>
        </BoardTitle>
        <SearchSortWrapper>
          <Search />
          <SortOptionButton />
        </SearchSortWrapper>
        <ProjectPostCardWrapper
            ref={listRef}
            style={{ height: "750px", overflowY: "auto" }}
        >
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
