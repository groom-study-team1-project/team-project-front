import React, { useEffect, useState } from "react";
import { fetchPostItems } from "../../../services/api";
import ProjectPostCard from "../../../components/Card/PostCard/ProjectPostCard/ProjectPostCard";
import {
  BoardTitle,
  ContentWrapper,
  PostCardWrapper,
  SearchSortWrapper,
  LastPostEnd,
} from "../Board.style";
import Search from "../../../components/Common/Search/Search";
import SortOptionButton from "../../../components/Common/SortOptionButton/SortOptionButton";
import { useInView } from "react-intersection-observer";

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
      console.log("InView detected, loading more posts...");
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
      <BoardTitle>프로젝트 게시판</BoardTitle>
      <SearchSortWrapper>
        <Search />
        <SortOptionButton />
      </SearchSortWrapper>
      <PostCardWrapper>
        {visibleItems.map((postItem) => (
          <ProjectPostCard
            key={postItem.id}
            id={postItem.id}
            title={postItem.title}
            content={postItem.content}
            name={postItem.author.name}
            job={postItem.author.job}
            email={postItem.author.email}
            count={postItem.count}
            img={postItem.imgUrl}
          />
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
