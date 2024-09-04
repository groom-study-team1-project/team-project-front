import React, { useState } from "react";
import styled from "styled-components";

import { ProfileImage } from "./PostCardComponents";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { Interaction } from "./Interactions";

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
  border: 1px solid black;
  margin: 10px;
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
      <ProfileImages $width={width} $height={height} />
      <div>
        <UserName $size={size} $bottom={bottom}>
          {nickName}
        </UserName>
        <div>{job}</div>
      </div>
    </ProfileHeaderLeft>
  );
};

const BoardContents = ({ contents }) => {
  return contents.map((content, index) => (
    <BoardContentsWrap key={index}>
      <div style={{ flex: "1" }}>
        <ProfileLeft
          width={"30px"}
          height={"30px"}
          size={"16px"}
          bottom={"2px"}
          nickName={content.user.nickName}
          job={content.user.Job}
        />
      </div>
      <BoardContent>{content.PostContent.title}</BoardContent>
      <Interaction count={content.PostContent.count} />
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

export const PostCollection = ({ myProfile }) => {
  return (
    <Mypost>
      <div>
        <span>내가 쓴 글</span>
        <span>
          {` ${
            myProfile.Post.freeBoard.length +
            myProfile.Post.projectBoard.length +
            myProfile.Post.questionBoard.length
          }`}
        </span>
      </div>
      <Board
        id={1}
        board={"자유 게시판"}
        count={myProfile.Post.freeBoard.length}
        contents={myProfile.Post.freeBoard}
      />
      <Board
        id={2}
        board={"프로젝트 자랑 게시판"}
        count={myProfile.Post.projectBoard.length}
        contents={myProfile.Post.projectBoard}
      />
      <Board
        id={3}
        board={"질문 게시판"}
        count={myProfile.Post.questionBoard.length}
        contents={myProfile.Post.questionBoard}
      />
    </Mypost>
  );
};
