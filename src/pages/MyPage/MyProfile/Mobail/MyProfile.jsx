import React, { useEffect, useState, useRef, useCallback } from "react";
import {
  MypostTitle,
  Hr,
  MyPostWrap,
  MyPostCardwrap,
  CategoryTitle,
  CategoryLi,
  CategoryList,
  CategoryCount,
  Nopost,
  NopostWrap,
  EndPost,
  StyledIcon,
} from "./MyProfile.style";
import NopostImg from "../../../../assets/images/Nopost.png";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { MyPosts } from "../../../../components/Card/MyPostsCard/MyPosts/MyPosts";
import { postInfo } from "../../../../services/api/authApi";
import { useNavigate, useParams } from "react-router-dom";
import { BarLoading } from "../../../../components/Common/LodingSpinner";

function MyPostsItems({ postCount }) {
  const [categorys] = useState([
    { id: 1, title: "자유 게시판" },
    { id: 2, title: "프로젝트 자랑 게시판" },
    { id: 3, title: "질문 게시판" },
  ]);

  const [lastPostIdByCategory, setLastPostIdByCategory] = useState(
    Number.MAX_SAFE_INTEGER
  );
  const [categoryId, setCategoryId] = useState(1);
  const [myPost, setMypost] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef(null);
  const navigate = useNavigate();
  const { memberId } = useParams();

  const limit = 6;

  const fetchData = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);

    try {
      const posts = await postInfo(
        categoryId,
        lastPostIdByCategory,
        limit,
        memberId
      );
      if (posts.length > 0) {
        setMypost((prevPosts) => [...prevPosts, ...posts]);

        const newLastPostId = posts[posts.length - 1].postId;
        setLastPostIdByCategory(newLastPostId);
      }

      if (posts.length < limit) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, categoryId, lastPostIdByCategory, limit]);

  const fetchInitialData = useCallback(async () => {
    setMypost([]);
    setLastPostIdByCategory(Number.MAX_SAFE_INTEGER);
    setHasMore(true);
    setLoading(true);

    try {
      const posts = await postInfo(
        categoryId,
        Number.MAX_SAFE_INTEGER,
        limit,
        memberId
      );
      console.log(posts);
      if (posts.length > 0) {
        setMypost(posts);
        const newLastPostId = posts[posts.length - 1].postId;
        setLastPostIdByCategory(newLastPostId);
      }

      if (posts.length < limit) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching initial posts:", error);
    } finally {
      setLoading(false);
    }
  }, [categoryId, limit]);

  useEffect(() => {
    fetchInitialData();
  }, [fetchInitialData]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasMore && !loading) {
          fetchData();
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 1.0,
      }
    );

    const currentObserverRef = observerRef.current;

    if (currentObserverRef) {
      observer.observe(currentObserverRef);
    }

    return () => {
      if (currentObserverRef) {
        observer.unobserve(currentObserverRef);
      }
    };
  }, [fetchData, hasMore, loading]);

  return (
    <>
      <div>
        <MypostTitle>내가 쓴 글</MypostTitle> <span>{postCount}</span>
      </div>
      <Hr />
      <MyPostWrap>
        <CategoryLi>
          <ul>
            {categorys.map((category) => (
              <CategoryList
                key={category.id}
                onClick={() => {
                  setCategoryId(category.id);
                }}
                $select={categoryId === category.id}
              >
                <div>
                  <CategoryTitle>{category.title}</CategoryTitle>
                  <CategoryCount $isOpen={categoryId === category.id}>
                    {myPost.length}개의 게시글
                  </CategoryCount>
                </div>
                <StyledIcon
                  icon={faChevronRight}
                  size="2xl"
                  $click={categoryId === category.id}
                />
              </CategoryList>
            ))}
          </ul>
        </CategoryLi>
        <MyPostCardwrap $Nopost={myPost.length === 0}>
          {myPost.length === 0 ? (
            <NopostWrap>
              <Nopost src={NopostImg} />
              <div onClick={() => navigate(`/board/write`)}>
                게시글 작성하기
              </div>
            </NopostWrap>
          ) : (
            <>
              {myPost.map((post, index) => (
                <MyPosts key={index} mypost={post} />
              ))}
              {loading && <BarLoading />}
              {!hasMore && <EndPost>모든 게시글을 불러왔습니다.</EndPost>}
              <div ref={observerRef} style={{ height: "1px" }} />
            </>
          )}
        </MyPostCardwrap>
      </MyPostWrap>
    </>
  );
}

export default MyPostsItems;
