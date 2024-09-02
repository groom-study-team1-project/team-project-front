import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ProfileImage } from "../components/Common/PostCardComponents";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { Interaction } from "../components/Common/Interactions";
import { fetchMyprofileData } from "../services/api";
const Wrap = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 100vh;
`;

const Main = styled.div`
  width: 1450px;
  border: 1px solid black;
`;

const ProfileWrap = styled.div`
  width: 1450px;
  margin-left: 0px;
  margin-bottom: 70px;
`;

const ProfileTitle = styled.div`
  border: 1px solid black;
  padding: 10px;
  border-radius: 10px;
  width: 200px;
  text-align: center;
`;

const ProfileHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  align-items: center;
`;

const ProfileHeaderLeft = styled.div`
  display: flex;
  align-items: center;
`;

const ProfileSetting = styled.button`
  border-radius: 10px;
  width: 155px;
  height: 50px;
  background-color: #7682ff;
  color: white;
  border: none;
  cursor: pointer;
`;

const UserName = styled.div`
  font-weight: bold;
  font-size: ${(props) => (props.$size ? props.$size : "32px")};
  margin-bottom: ${(props) => (props.$bottom ? props.$bottom : "20px")};
`;

const Userintroduce = styled.div`
  padding: 20px;
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

const ProfileLeft = ({ width, height, size, bottom, nickName, job }) => {
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

function MyPage() {
  const [myProfile, setProfile] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const MyprofileData = await fetchMyprofileData();
        setProfile(MyprofileData.result);
      } catch (error) {
        console.error("데이터 가져오는데 실패", error);
      }
    };
    fetchData();
  }, []);

  if (!myProfile) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <Wrap>
        <ProfileWrap>
          <ProfileTitle>프로필</ProfileTitle>
        </ProfileWrap>
        <Main>
          <ProfileHeader>
            <ProfileLeft
              nickName={myProfile.userInfo.nickName}
              job={myProfile.userInfo.Job}
            />
            <ProfileSetting>프로필 수정</ProfileSetting>
          </ProfileHeader>
          <hr />
          <Userintroduce>{myProfile.userInfo.userIntroduce}</Userintroduce>
          <hr />
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
        </Main>
      </Wrap>
    </>
  );
}

export default MyPage;
