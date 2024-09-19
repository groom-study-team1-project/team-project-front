import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { Interaction } from "./Interactions";
import { ProfileImage } from "../Card/PostCard/PostProfile";
import { postInfo } from "../../services/authApi";
import { useSelector } from "react-redux";

const ProfileHeaderLeft = styled.div`
  display: flex;
  align-items: center;
`;

const UserName = styled.div`
  font-weight: bold;
  font-size: ${(props) => (props.$size ? props.$size : "32px")};
  margin-bottom: ${(props) => (props.$bottom ? props.$bottom : "20px")};
`;

const Mypost = styled.div`
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.6) 50%,
    rgba(255, 255, 255, 0.5) 100%
  );
  border-radius: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  margin: 24px;
  border-radius: 10px;
  padding: 10px;
`;

const Myboard = styled.div`
  padding: 10px;
  border: 1px solid black;
  margin: 10px;
  display: flex;
  justify-content: space-between;
  border-radius: 8px;
  span {
    cursor: pointer;
  }
`;

const ProfileImages = styled(ProfileImage)`
  width: ${(props) => (props.$width ? props.$width : "100px")};
  height: ${(props) => (props.$height ? props.$height : "100px")};
  background-color: lightblue; // 임시 배경색 지정
  border: 2px solid white;
`;

const BoardContentsWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0px 20px 10px 20px;
`;

const BoardContent = styled.div`
  flex: 4;
  margin-left: 75px;
`;

export const ProfileLeft = ({ width, height, size, bottom, nickName, job }) => {
  return (
    <ProfileHeaderLeft>
      <ProfileImages $width="200px" $height="200px" />
      <div style={{ marginLeft: "32px" }}>
        <UserName $size="40px" $bottom={bottom}>
          {nickName}
        </UserName>
        <div>{job}</div>
      </div>
    </ProfileHeaderLeft>
  );
};

const BoardContents = ({ contents }) => {
  const userInfo = useSelector((state) => state.user.userInfo);

  return contents.map((content) => (
    <BoardContentsWrap key={content.postId}>
      <div style={{ flex: "1" }}>
        <ProfileLeft
          width={"30px"}
          height={"30px"}
          size={"16px"}
          bottom={"2px"}
          nickName={userInfo.nickName}
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
      <Myboard>
        <div>{board}</div>
        <div
          onClick={() => {
            onClickhandler(id);
          }}
        >
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
      <div>
        <span>내가 쓴 글</span>
        <span>
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
