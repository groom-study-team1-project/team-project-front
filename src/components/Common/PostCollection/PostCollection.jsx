import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { Interaction } from "../Interactions";
import { postInfo } from "../../../services/authApi";
import { useSelector } from "react-redux";
import {
  BoardContent,
  BoardContentsWrap,
  Myboard,
  Mypost,
  ProfileHeaderLeft,
  ProfileImages,
  UserJob,
  UserName,
} from "./PostCollection.style";

export const ProfileLeft = ({
  width,
  height,
  marginRight,
  size,
  bottom,
  nickName,
  jobSize,
  color,
  job,
}) => {
  return (
    <ProfileHeaderLeft>
      <ProfileImages
        $width={width}
        $height={height}
        $marginRight={marginRight}
      />
      <div style={{ marginLeft: "24px" }}>
        <UserName $size={size} $bottom={bottom}>
          {nickName}
        </UserName>
        <UserJob $jobSize={jobSize} $color={color}>
          {job}
        </UserJob>
      </div>
    </ProfileHeaderLeft>
  );
};

const BoardContents = ({ contents }) => {
  const userInfo = useSelector((state) => state.user.userInfo);

  return contents.map((content) => (
    <BoardContentsWrap key={content.postId}>
      <div style={{ flex: "1.1" }}>
        <ProfileLeft
          width={"30px"}
          height={"30px"}
          size={"14px"}
          bottom={"8px"}
          nickName={userInfo.nickname}
          jobSize={"10px"}
          color={"#828282"}
          job={userInfo.role}
        />
      </div>
      <BoardContent>{content.postTitle}</BoardContent>
      <Interaction count={content.count} />
    </BoardContentsWrap>
  ));
};

const Board = ({ board, count, id, contents }) => {
  const [hidden, setHidden] = useState(false);

  const onClickhandler = () => {
    setHidden(!hidden);
  };

  return (
    <div>
      <Myboard
        onClick={() => {
          onClickhandler(id);
        }}
      >
        <div>{board}</div>
        <div>
          <span>{`${count}개의 게시글`}</span>
          <span style={{ marginLeft: "5px" }}>
            <FontAwesomeIcon icon={faAngleDown} />
          </span>
        </div>
      </Myboard>
      {hidden && id === 1 && <BoardContents contents={contents} />}
      {hidden && id === 2 && <BoardContents contents={contents} />}
      {hidden && id === 3 && <BoardContents contents={contents} />}
    </div>
  );
};

export const PostCollection = ({ memberId }) => {
  const [freeBoard, setFreeBoard] = useState([]);
  const [projectBoard, setProjectBoard] = useState([]);
  const [questionBoard, setQuestionBoard] = useState([]);
  const catergoryId = {
    freeBoard: 1,
    projectBoard: 2,
    questionBoard: 3,
  };

  useEffect(() => {
    postInfo(memberId, catergoryId.freeBoard)
      .then((data) => setFreeBoard(data))
      .catch((err) => console.log(err));
    postInfo(memberId, catergoryId.projectBoard)
      .then((data) => setProjectBoard(data))
      .catch((err) => console.log(err));
    postInfo(memberId, catergoryId.questionBoard)
      .then((data) => setQuestionBoard(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <Mypost>
      <div style={{ padding: "10px" }}>
        <span style={{ fontWeight: "bold", fontSize: "17px" }}>내가 쓴 글</span>
        <span style={{ fontSize: "14px", paddingLeft: "5px" }}>
          {` ${freeBoard.length + projectBoard.length + questionBoard.length}`}
        </span>
      </div>
      <Board
        id={catergoryId.freeBoard}
        board={"자유 게시판"}
        count={freeBoard.length}
        contents={freeBoard}
      />
      <Board
        id={catergoryId.projectBoard}
        board={"프로젝트 자랑 게시판"}
        count={projectBoard.length}
        contents={projectBoard}
      />
      <Board
        id={catergoryId.questionBoard}
        board={"질문 게시판"}
        count={questionBoard.length}
        contents={questionBoard}
      />
    </Mypost>
  );
};
