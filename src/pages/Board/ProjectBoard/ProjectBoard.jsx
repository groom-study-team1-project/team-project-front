import React, { useEffect, useState } from "react";
import { fetchPostItems } from "../../../services/api/api";
import ProjectPostCard from "../../../components/Card/PostCard/ProjectPostCard/ProjectPostCard";
import {
  Title,
  BoardTitle,
  ContentWrapper,
  SearchSortWrapper,
  LastPostEnd,
  PostCardWrapper,
} from "../Board.style"; // PostCardWrapper는 여기서 이미 import 되어 있음
import Search from "../../../components/Common/Search/Search";
import SortOptionButton from "../../../components/Common/SortOptionButton/SortOptionButton";
import { useInView } from "react-intersection-observer";
import { ProjectPostCardWrapper } from "./ProjectBoard.style"; // 이 부분은 프로젝트 내에 정의되어 있다고 가정

function ProjectBoard() {
  const [postItems, setPostItems] = useState([]);
  const [visibleItems, setVisibleItems] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const itemsPerPage = 6;
  const { ref, inView } = useInView({
    threshold: 1,
    triggerOnce: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allPosts = await fetchPostItems();

        setPostItems(allPosts);
        setVisibleItems(allPosts.slice(0, itemsPerPage));

        if (allPosts.length <= itemsPerPage) {
          setHasMore(false);
        }
      } catch (err) {
        console.log("Error fetching posts:", err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (inView && hasMore && !isFetching) {
      setIsFetching(true);
      const startIndex = page * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;

      const newPosts = postItems.slice(startIndex, endIndex);

      if (newPosts.length > 0) {
        setVisibleItems((prevItems) => [...prevItems, ...newPosts]);
        setPage((prevPage) => prevPage + 1);
      } else {
        setHasMore(false);
      }

      setTimeout(() => {
        setIsFetching(false);
      }, 500);
    }
  }, [inView, hasMore, isFetching, page, postItems]);

  return (
    <ContentWrapper>
      <BoardTitle>
        <Title>프로젝트 게시판</Title>
      </BoardTitle>
      <SearchSortWrapper>
        <Search />
        <SortOptionButton />
      </SearchSortWrapper>
      <PostCardWrapper>
        {visibleItems.map((postItem) => (
          <ProjectPostCardWrapper key={postItem.id}>
            <ProjectPostCard
              id={postItem.id}
              title={postItem.title}
              content={postItem.content}
              name={postItem.author.name}
              job={postItem.author.job}
              email={postItem.author.email}
              count={postItem.count}
              img={postItem.imgUrl}
            />
          </ProjectPostCardWrapper>
        ))}
      </PostCardWrapper>

      {hasMore ? (
        <LastPostEnd ref={ref}>Loading more...</LastPostEnd>
      ) : (
        <LastPostEnd>더 이상의 포스트가 없습니다.</LastPostEnd>
      )}
    </ContentWrapper>
  );
}

export default ProjectBoard;
