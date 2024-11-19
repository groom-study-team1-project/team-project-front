import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { DecoupledEditor } from "ckeditor5";
import Slide from "../../../../components/Common/imgSlide";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { editorConfig } from "../../BoardWrite/WriteBoard/editor";
import { fetchPostDetail } from "../../../../services/api/postApi";
import { PostProfileBox } from "../../../../components/Card/PostCard/PostProfile";
import { Interaction } from "../../../../components/Common/Interactions";
import { deletepost } from "../../../../services/api/postApi";
import Comments from "../Comment/Comment";
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
import { ContentWrapper, PostCardWrapper } from "../../Board.style";

function BoardDetail() {
  const [post, setPost] = useState(null);
  const [modalVisible, setModalVisible] = useState(false); // 모달 상태 관리
  const { isMobile } = useSelector((state) => state.screenSize);
  const navigate = useNavigate();
  const { postId } = useParams();
  const [category, setCategory] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const postResponse = await fetchPostDetail(postId);

        setPost(postResponse);
        switch (postResponse.categoryId) {
          case 1:
            setCategory("자유 게시판");
            break;
          case 2:
            setCategory("프로젝트 게시판");
            break;
          case 3:
            setCategory("질문 게시판");
            break;
          case 4:
            setCategory("공지사항");
            break;
          default:
            setCategory("정보를 찾지 못했습니다");
            break;
        }
      } catch (error) {
        console.error("데이터를 가져오는데 실패", error);
      }
    };

    fetchData();
  }, [postId]);

  if (!post) {
    return <div>Loading...</div>;
  }

  const handleModalClose = () => setModalVisible(false);
  const handleEdit = () => {
    navigate(`/board/edit/${postId}`);
    setModalVisible(false);
  };
  const handleDelete = () => {
    deletepost(postId);
    setModalVisible(false);
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
                imgUrl={post.memberInfo.image_url}
              />
              <PostheaderRignt $isMobile={isMobile}>
                <div>{post.createdAt}</div>
                <Modify onClick={() => setModalVisible(true)}>
                  <FontAwesomeIcon icon={faEllipsisVertical} />
                </Modify>
                <ModalComponent
                  isVisible={modalVisible}
                  onClose={handleModalClose}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              </PostheaderRignt>
            </Postheader>
            {category === "프로젝트 자랑 게시판" ? (
              <div>
                <Slide imgUrls={post.imgUrl} />
              </div>
            ) : null}

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
              {post.hashtags.map((hashtag, index) => (
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
          <Comments />
        </Wrap>
      </ContentWrapper>
    </>
  );
}

export default BoardDetail;
