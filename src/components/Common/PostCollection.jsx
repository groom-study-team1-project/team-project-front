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

const UserJob = styled.div`
  font-size: ${(props) => (props.$jobSize ? props.$jobSize : "16px")};
  color: ${(props) => (props.$color ? props.$color : "black")};
`;

const Mypost = styled.div`
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.6) 50%,
    rgba(255, 255, 255, 0.5) 100%
  );
  border-radius: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  margin: 24px;
  border-radius: 10px;
  padding: 16px;
`;

const Myboard = styled.div`
  padding: 10px 16px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  margin: 10px;
  display: flex;
  justify-content: space-between;
  border-radius: 8px;

  span {
    cursor: pointer;
    color: #575757;
    padding-right: 10px;
  }
`;

const ProfileImages = styled(ProfileImage)`
  width: ${(props) => (props.$width ? props.$width : "100px")};
  height: ${(props) => (props.$height ? props.$height : "100px")};
  background-color: lightblue; // 임시 배경색 지정
  border: 2px solid white;
  margin-right: ${(props) => (props.$marginRight ? props.marginRight : "0")};
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
      <div style={{ flex: "1.2" }}>
        <ProfileLeft
          width={"50px"}
          height={"50px"}
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
