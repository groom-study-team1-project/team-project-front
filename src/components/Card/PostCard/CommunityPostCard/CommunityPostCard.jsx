import { useState } from "react";
import { ArrowButton, Interaction } from "../../../Common/Interactions";
import {
  ContentBox,
  InnerContainer,
  PostActions,
  PostCardWrapper,
  Thumbnail,
} from "../PostCard.style";
import { PostProfileBox } from "../PostProfile";
import { CustomBody } from "./CommunityPostCard.style";
import { useNavigate } from "react-router-dom";

function CommunityPostCard({
  id,
  title,
  content,
  name,
  job,
  count = { view: 0, like: 0, comment: 0 },
  img,
}) {
  const [imgIndex, setImgIndex] = useState(0);
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate(`/board/detail/${id}`);
  };

  const handlePrevImage = (e) => {
    e.stopPropagation();
    setImgIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
  };

  const handleNextImage = (e) => {
    e.stopPropagation();
    setImgIndex((prevIndex) =>
      prevIndex < img.length - 1 ? prevIndex + 1 : prevIndex
    );
  };

  return (
    <PostCardWrapper height="232px" onClick={handleNavigation}>
      <InnerContainer>
        <Thumbnail>
          <img src={img[imgIndex].url} alt={`img ${imgIndex}`} />
        </Thumbnail>
        <CustomBody>
          <PostActions>
            <PostProfileBox name={name} job={job} />
            <Interaction count={count} />
          </PostActions>
          <ContentBox>
            <p>{title}</p>
            <p>{content}</p>
          </ContentBox>
          <ArrowButton
            handlePrevImage={(e) => handlePrevImage(e)}
            handleNextImage={(e) => handleNextImage(e)}
          />
        </CustomBody>
      </InnerContainer>
    </PostCardWrapper>
  );
}

export default CommunityPostCard;
