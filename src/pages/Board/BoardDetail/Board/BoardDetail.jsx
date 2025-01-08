import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { DecoupledEditor } from "ckeditor5";
import Slide from "../../../../components/Common/imgSlide";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { editorConfig } from "../../BoardWrite/WriteBoard/editor";
import { fetchPostDetail, deletepost } from "../../../../services/api/postApi";
import { fetchProfileInfo } from "../../../../services/api/authApi";
import { PostProfileBox } from "../../../../components/Card/PostCard/PostProfile";
import { Interaction } from "../../../../components/Common/Interactions";
import Comments from "../../../../components/Common/Comment/Comment";
import ModalComponent from "../../../../components/Modal/EditDeleteModal/EditDeleteModal"; // 모달 컴포넌트 추가
import { useSelector } from "react-redux";
import {
  CategotyWrap,
  Wrap,
  PostWrap,
  Postheader,
  PostheaderRignt,
  Modify,
  Title,
  PostFooter,
  CategoryTitle,
} from "./BoardDetail.style";
import { ContentWrapper } from "../../Board.style";
import useJwt from "../../../../hooks/useJwt";

function BoardDetail() {
  const [post, setPost] = useState(null);
  const [modalVisible, setModalVisible] = useState(false); // 모달 상태 관리
  const { isMobile } = useSelector((state) => state.screenSize);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const [isMe, setIsMe] = useState(false); // isMe 상태 관리
  const navigate = useNavigate();
  const { postId } = useParams();
  const [category, setCategory] = useState("");
  const payload = useJwt(
    useSelector((state) => state.user.userInfo.accessToken)
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 게시글 상세 정보 가져오기
        const postResponse = await fetchPostDetail(postId);
        console.log("Fetched Post Detail:", postResponse);

        setPost(postResponse);

        let categoryText = "";
        switch (postResponse.categoryId) {
          case 1:
            categoryText = "자유 게시판";
            break;
          case 2:
            categoryText = "프로젝트 게시판";
            break;
          case 3:
            categoryText = "질문 게시판";
            break;
          case 4:
            categoryText = "공지사항";
            break;
          default:
            categoryText = "정보를 찾지 못했습니다";
            break;
        }
        setCategory(categoryText);

        // 사용자 여부 확인
        if (isLoggedIn) {
          const body = {
            isMe: payload.memberId,
            memberId: postResponse.memberInfo.memberId,
          };
          const { isMe } = await fetchProfileInfo(body);
          setIsMe(isMe); // isMe 설정
          console.log("isMe Value:", isMe);
        }
      } catch (error) {
        console.error("데이터를 가져오는데 실패", error);
      }
    };

    fetchData();
  }, [postId, isLoggedIn, payload]);

  if (!post) {
    return <div>Loading...</div>;
  }

  const formattedDate = new Date(
    new Date(post.createdAt).getTime() + 9 * 60 * 60 * 1000
  ).toLocaleString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false, // 24시간 형식
  });

  const handleModalClose = () => setModalVisible(false);
  const handleEdit = () => {
    navigate(`/board/edit/${postId}`);
    setModalVisible(false);
  };
  const handleDelete = async () => {
    try {
      await deletepost(postId); // 게시글 삭제 API 호출
      setModalVisible(false);
      navigate(-1); // 이전 페이지로 리다이렉션
    } catch (error) {
      console.error("게시글 삭제 중 오류 발생:", error);
    }
  };

  return (
    <>
      <ContentWrapper $isDetail={true}>
        <Wrap>
          <CategotyWrap $isMobile={isMobile}>
            <CategoryTitle $isMobile={isMobile}>{category}</CategoryTitle>
          </CategotyWrap>

          <PostWrap>
            <Postheader $isMobile={isMobile}>
              <PostProfileBox
                name={post.memberInfo.nickname}
                job={post.memberInfo.memberJob}
                email={post.memberInfo.email}
                imgUrl={post.memberInfo.imageUrl}
              />
              <PostheaderRignt $isMobile={isMobile}>
                <div>{formattedDate}</div>
                {isMe && (
                  <>
                    <Modify onClick={() => setModalVisible(true)}>
                      <FontAwesomeIcon icon={faEllipsisVertical} />
                    </Modify>
                    <ModalComponent
                      isVisible={modalVisible}
                      onClose={handleModalClose}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                    />
                  </>
                )}
              </PostheaderRignt>
            </Postheader>
            {category === "프로젝트 게시판" && post.imageUrls?.length > 0 && (
              <div style={{ marginBottom: "20px" }}>
                <Slide imgUrls={post.imageUrls} />
              </div>
            )}
            <Title $isMobile={isMobile}>{post.title}</Title>
            <CKEditor
              editor={DecoupledEditor}
              config={editorConfig}
              data={post.content}
              disabled={true}
            />
          </PostWrap>
          <PostFooter $isMobile={isMobile}>
            <div>
              {post.hashtags &&
                post.hashtags.map((hashtag, index) => (
                  <span key={index}>{hashtag}</span>
                ))}
            </div>
            <Interaction
              count={{
                viewCount: post.countInfo.viewCount,
                likeCount: post.countInfo.likeCount,
                commentCount: post.countInfo.commentCount,
              }}
            />
          </PostFooter>
          <Comments commentCount={post.countInfo.commentCount}/>
        </Wrap>
      </ContentWrapper>
    </>
  );
}

export default BoardDetail;
