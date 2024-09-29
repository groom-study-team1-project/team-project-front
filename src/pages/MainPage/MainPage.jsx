import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Content,
  Detail,
  LeftArea,
  PostCard,
  PostCardLine,
  RightArea,
  SubTitle,
  Title,
  PostCardImg,
} from "./MainPage.style";
import Navbar from "../../Layout/Navbar/Navbar";
import redirectIcon from "../../assets/images/redirect-to-board.png";
import { useNavigate } from "react-router-dom";
import projectBoardCardImg from "../../assets/images/Template Card.png";
import freeBoardCardImg from "../../assets/images/Story Card Horizontal.png";
import { fetchCategoryItems } from "../../services/api/postApi";
import { useDispatch } from "react-redux";
import { selectMenuItem } from "../../store/category/menuSlice";

function MainPage() {
  const [menuItems, setMenuItems] = useState([]);
  const [freeBoardId, setFreeBoardId] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    fetchCategoryItems()
      .then((items) => {
        setMenuItems(items);

        const freeBoardItem = items.find((item) => item.id === 1);
        if (freeBoardItem) {
          setFreeBoardId(freeBoardItem.id);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleMenuClick = () => {
    dispatch(selectMenuItem(freeBoardId));
    handleNavigation();
  };

  const handleNavigation = () => {
    console.log(11);
    navigate("/board/free");
  };

  return (
    <>
      <Container>
        <Navbar isMainPage={true} />
        <Content>
          <LeftArea>
            <Title>DeepDivers</Title>
            <SubTitle>
              다양한 게시판을 통해
              <br />
              여러분만의 이야기를 공유하고,
              <br />
              새로운 인연을 만날 수 있습니다.
            </SubTitle>
            <Detail>
              우리는 구름 DeepDive에 참여하는 여러분에 대해 열정적으로
              이야기하고,
              <br />
              서로를 지원하며 함께 성장하는 커뮤니티를 만듭니다. 전문가의 조언,
              친근한
              <br /> 네트워크, 유익한 자료와 활동으로 커뮤니티에서 유익한 시간을
              보내세요.
            </Detail>
            <Button onClick={handleMenuClick}>
              DeepDivers 게시판으로 바로가기
              <img src={redirectIcon} alt="Redirect to board" />
            </Button>
          </LeftArea>
          <RightArea>
            <PostCardLine>
              <PostCardImg
                src={projectBoardCardImg}
                alt="프로젝트 게시판 이미지"
                height="438"
              />
              <PostCardImg
                src={freeBoardCardImg}
                alt="자유 게시판 이미지"
                width="550"
              />
            </PostCardLine>
          </RightArea>
        </Content>
      </Container>
    </>
  );
}

export default MainPage;
