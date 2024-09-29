import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { DecoupledEditor } from "ckeditor5";
import Slide from "../../../../components/Common/imgSlide";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { editorConfig } from "../../BoardWrite/WriteBoard/editor";
import { fetchPostDetail } from "../../../../services/postApi";
import { PostProfileBox } from "../../../../components/Card/PostCard/PostProfile";
import { Interaction } from "../../../../components/Common/Interactions";
import { deletepost } from "../../../../services/postApi";
import Comments from "../Comment/Comment";
import ModalComponent from "../../../../components/Modal/EditDeleteModal/EditDeleteModal"; // 모달 컴포넌트 추가
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

function BoardDetail() {
  const [post, setPost] = useState(null);
  const [modalVisible, setModalVisible] = useState(false); // 모달 상태 관리
  const [postData, setPostData] = useState("");
  const navigate = useNavigate();
  const { postId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postResponse = await fetchPostDetail(postId);

        setPost(postResponse);
        setPostData(postResponse.postInfo.content);
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
    deletepost(`${postId}`);
    setModalVisible(false);
  };

  return (
    <>
      <ContentWrapper>
        <Wrap>
          <CategotyWrap>
            <CategoryTitle>{post.categoryInfo.title}</CategoryTitle>
          </CategotyWrap>

          <PostWrap>
            <Postheader>
              <PostProfileBox
                name={post.memberInfo.nickname}
                job={post.memberInfo.development}
                email={post.memberInfo.email}
              />
              <div>
                <PostheaderRignt>
                  <div>{post.postInfo.createdAt}</div>
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
              </div>
            </Postheader>
            {post.categoryInfo.title === "프로젝트 게시판" ? (
              <div>
                <Slide imgUrls={post.postInfo.imgUrl} />
              </div>
            ) : null}

            <Title>{post.postInfo.title}</Title>
            <CKEditor
              editor={DecoupledEditor}
              config={editorConfig}
              data={postData}
              disabled={true}
            />
          </PostWrap>
          <PostFooter>
            <div>
              {post.postInfo.hashtags.map((hashtag, index) => (
                <span key={index}>{hashtag}</span>
              ))}
            </div>
            <Interaction
              count={{
                view: post.postInfo.viewCount,
                like: post.postInfo.recommedCount,
                comment: post.postInfo.commentCount,
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
