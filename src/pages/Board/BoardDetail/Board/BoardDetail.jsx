import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { DecoupledEditor } from "ckeditor5";
import Slide from "../../../../components/Common/imgSlide";
import { editorConfig } from "../../BoardWrite/WriteBoard/editor";
import { fetchPostDetail, deletepost } from "../../../../services/api/postApi";
import { fetchProfileInfo } from "../../../../services/api/authApi";
import { PostProfileBox } from "../../../../components/Card/PostCard/PostProfile";
import { Interaction } from "../../../../components/Common/Interactions";
import Comments from "../../../../components/Common/Comment/Comment";
import ConfirmDeleteModal from "../../../../components/Modal/ConfirmDeleteModal/ConfirmDeleteModal";
import { useSelector } from "react-redux";
import {
  Wrap,
  PostWrap,
  Postheader,
  PostheaderRignt,
  Modify,
  Title,
  PostFooter,
  ContentWrap,
} from "./BoardDetail.style";
import { ContentWrapper } from "../../Board.style";
import useJwt from "../../../../hooks/useJwt";

function BoardDetail() {
  const [post, setPost] = useState(null);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false); // 삭제 확인 모달 상태
  const { isMobile } = useSelector((state) => state.screenSize);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const [isMe, setIsMe] = useState(false);
  const navigate = useNavigate();
  const { postId } = useParams();
  const payload = useJwt(
    useSelector((state) => state.user.userInfo.accessToken)
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postResponse = await fetchPostDetail(postId);
        setPost(postResponse);
        if (isLoggedIn) {
          const body = {
            isMe: payload.memberId,
            memberId: postResponse.authorInformation.memberId,
          };
          const { isMe } = await fetchProfileInfo(body);
          setIsMe(isMe);
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

  const handleEdit = () => {
    navigate(`/board/edit/${postId}`);
  };

  const handleDelete = async () => {
    try {
      await deletepost(postId);
      setConfirmModalVisible(false);
      navigate(-1);
    } catch (error) {
      console.error("게시글 삭제 중 오류 발생:", error);
    }
  };

  return (
    <>
      <ContentWrapper $isDetail={true}>
        <Wrap>
          <PostWrap>
            <Title $isMobile={isMobile}>{post.title}</Title>
            <Postheader $isMobile={isMobile}>
              <PostProfileBox
                name={post.authorInformation.nickname}
                job={post.authorInformation.memberJob}
                email={post.authorInformation.email}
                imgUrl={post.authorInformation.imageUrl}
              />
              <PostheaderRignt $isMobile={isMobile}>
                {isMe && (
                  <>
                    <Modify onClick={handleEdit}>수정</Modify>
                    <Modify onClick={() => setConfirmModalVisible(true)}>
                      삭제
                    </Modify>
                  </>
                )}
              </PostheaderRignt>
            </Postheader>
            {post.categoryTitle === "프로젝트 게시판" &&
              post.imageUrls?.length > 0 && (
                <div style={{ marginBottom: "20px" }}>
                  <Slide imgUrls={post.imageUrls} />
                </div>
              )}
            <ContentWrap>
              <CKEditor
                editor={DecoupledEditor}
                config={editorConfig}
                data={post.content}
                disabled={true}
              />
            </ContentWrap>
          </PostWrap>
          <PostFooter $isMobile={isMobile}>
            <div>
              {post.hashtags && post.hashtags.length > 0 ? (
                post.hashtags.map((hashtag, index) => (
                  <span key={index}>{hashtag}</span>
                ))
              ) : (
                <span>#</span>
              )}
            </div>
            <Interaction
              count={{
                viewCount: post.viewCount,
                likeCount: post.likeCount,
                commentCount: post.commentCount,
              }}
            />
          </PostFooter>
          <Comments />
        </Wrap>
      </ContentWrapper>
      <ConfirmDeleteModal
        isVisible={confirmModalVisible}
        onClose={() => setConfirmModalVisible(false)}
        onConfirm={handleDelete}
        title="삭제하시겠습니까?"
        description="이 작업은 되돌릴 수 없습니다."
        confirmText="확인"
        cancelText="취소"
      />
    </>
  );
}

export default BoardDetail;
