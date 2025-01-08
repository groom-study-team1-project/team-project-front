import React, { useEffect, useState, useRef, useCallback } from "react";
import {
  Main,
  LeftContent,
  RightContent,
  RightContentWrap,
  MypostTitle,
  Hr,
  ProfileSetting,
  Wrap,
  UserInfoBox,
  MyPostWrap,
  MyPostCardwrap,
  CategoryTitle,
  CategoryLi,
  CategoryList,
  CategoryCount,
  Nopost,
  NopostWrap,
  EndPost,
} from "./MyProfile.style";
import NopostImg from "../../../assets/images/Nopost.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faBlogger } from "@fortawesome/free-brands-svg-icons";
import { MyPosts } from "../../../components/Card/MyPostsCard/MyPosts/MyPosts";
import { useSelector } from "react-redux";
import { fetchProfileInfo, postInfo } from "../../../services/api/authApi";
import { useNavigate, useParams, Link } from "react-router-dom";
import { BigProfileBox } from "../../../components/Card/PostCard/PostProfile";
import useJwt from "../../../hooks/useJwt";
import { BarLoading } from "../../../components/Common/LodingSpinner";

function MyProfile() {
  const [profileData, setProfileData] = useState(null);
  const [isMe, setIsMe] = useState(false);
  const [categorys] = useState([
    { id: 1, title: "자유 게시판" },
    { id: 2, title: "프로젝트 자랑 게시판" },
    { id: 3, title: "질문 게시판" },
  ]);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
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
  const payload = useJwt(
    useSelector((state) => state.user.userInfo.accessToken)
  );
  const limit = 5;

  const fetchData = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);

    try {
      const posts = await postInfo(categoryId, lastPostIdByCategory);

      if (posts.length > 0) {
        setMypost((prevPosts) => [...prevPosts, ...posts]);
        const newLastPostId = posts[posts.length - 1].id;
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
      const posts = await postInfo(categoryId, Number.MAX_SAFE_INTEGER);

      if (posts.length > 0) {
        setMypost(posts);
        const newLastPostId = posts[posts.length - 1].id;
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
    if (isLoggedIn) {
      fetchInitialData();
    }
  }, [isLoggedIn, fetchInitialData]);

  useEffect(() => {
    if (!isLoggedIn) return;

    const fetchProfileData = async () => {
      try {
        const body = { isMe: payload.memberId, memberId };
        const { isMe, data } = await fetchProfileInfo(body);
        console.log(data);
        if (data.status.code === 1002) {
          setIsMe(isMe);
          setProfileData(data.result);
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, [isLoggedIn, memberId, payload]);

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

  if (!isLoggedIn) {
    return <div>로그인이 필요합니다.</div>;
  }

  if (!profileData) {
    return <div>Loading...</div>;
  }

  const redirectToEditPage = () => {
    navigate(`/my-page/edit/${memberId}`);
  };

  return (
    <Wrap>
      <Main>
        <LeftContent>
          <BigProfileBox
            nickName={profileData.nickname}
            job={profileData.job}
            src={profileData.imageUrl}
          />
          <UserInfoBox>{profileData.aboutMe}</UserInfoBox>
          <UserInfoBox>
            <Link src={profileData.githubUrl}>
              <FontAwesomeIcon icon={faGithub} size="2xl" />
              &nbsp;&nbsp;<span>Github</span>
            </Link>
          </UserInfoBox>
          <UserInfoBox>
            <Link src={profileData.blogUrl}>
              <FontAwesomeIcon icon={faBlogger} size="2xl" />
              &nbsp;&nbsp;<span>Blog</span>
            </Link>
          </UserInfoBox>
          {isMe && (
            <ProfileSetting onClick={redirectToEditPage}>
              프로필 수정
            </ProfileSetting>
          )}
        </LeftContent>
        <RightContentWrap>
          <RightContent>
            <div>
              <MypostTitle>내가 쓴 글</MypostTitle>{" "}
              <span>{profileData.postCount}</span>
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
                    >
                      <div>
                        <CategoryTitle>{category.title}</CategoryTitle>
                        <CategoryCount $isOpen={categoryId === category.id}>
                          {myPost.length}개의 게시글
                        </CategoryCount>
                      </div>
                      <FontAwesomeIcon icon={faChevronRight} />
                    </CategoryList>
                  ))}
                </ul>
              </CategoryLi>
              <MyPostCardwrap
                $Nopost={myPost.length === 0}
                style={{ height: "700px", overflowY: "auto" }}
              >
                {myPost.length === 0 ? (
                  <NopostWrap>
                    <Nopost src={NopostImg} />
                    <div onClick={() => navigate(`/board/write`)}>
                      게시글 작성하기
                    </div>
                  </NopostWrap>
                ) : (
                  <>
                    {myPost.map((post) => (
                      <MyPosts key={post.id} mypost={post} />
                    ))}
                    {!hasMore && <EndPost>모든 게시글을 불러왔습니다.</EndPost>}
                    {loading && <BarLoading />}
                    <div ref={observerRef} style={{ height: "1px" }} />
                  </>
                )}
              </MyPostCardwrap>
            </MyPostWrap>
          </RightContent>
        </RightContentWrap>
      </Main>
    </Wrap>
  );
}

export default MyProfile;
