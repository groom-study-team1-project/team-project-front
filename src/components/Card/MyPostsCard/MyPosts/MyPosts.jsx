import React, { useEffect, useState } from "react";
import { postInfo } from "../../../../services/api/authApi";
import { MyPost, MyPostTitle } from "./MyPosts.style";
import PostsByCategory from "../PostsByCategory/PostsByCategory";

export const MyPosts = ({ postCount }) => {
  const [freeBoard, setFreeBoard] = useState([]);
  const [projectBoard, setProjectBoard] = useState([]);
  const [questionBoard, setQuestionBoard] = useState([]);
  const [lastPostId, setLastPostId] = useState({
    freeBoard: 5,
    projectBoard: 5,
    questionBoard: 5,
  });
  const catergoryId = {
    freeBoard: 1,
    projectBoard: 2,
    questionBoard: 3,
  };

  useEffect(() => {
    postInfo(catergoryId.freeBoard, lastPostId.freeBoard)
      .then((data) => setFreeBoard(data))
      .catch((err) => console.log(err));

    postInfo(catergoryId.projectBoard, lastPostId.projectBoard)
      .then((data) => setProjectBoard(data))
      .catch((err) => console.log(err));

    postInfo(catergoryId.questionBoard, lastPostId.questionBoard)
      .then((data) => setQuestionBoard(data))
      .catch((err) => console.log(err));

    console.log(lastPostId);
  }, [lastPostId]);

  const handleLoadMore = (boardType) => {
    setLastPostId((prevLastPostId) => ({
      ...prevLastPostId,
      [boardType]: prevLastPostId[boardType] + 5,
    }));
  };

  return (
    <MyPost>
      <MyPostTitle>
        <span className="title">내가 작성한 글</span>
        <span className="post-count">{postCount}</span>
      </MyPostTitle>
      <PostsByCategory
        id={catergoryId.freeBoard}
        board={"자유 게시판"}
        contents={freeBoard}
        onLoadMore={() => handleLoadMore("freeBoard")}
        lastPostId={lastPostId.freeBoard}
        postCount={postCount.freeBoard}
      />
      <PostsByCategory
        id={catergoryId.projectBoard}
        board={"프로젝트 게시판"}
        contents={projectBoard}
        onLoadMore={() => handleLoadMore("projectBoard")}
        lastPostId={lastPostId.projectBoard}
        postCount={postCount.projectBoard}
      />
      <PostsByCategory
        id={catergoryId.questionBoard}
        board={"질문 게시판"}
        contents={questionBoard}
        onLoadMore={() => handleLoadMore("questionBoard")}
        lastPostId={lastPostId.questionBoard}
        postCount={postCount.questionBoard}
      />
    </MyPost>
  );
};
