import { useState } from "react";
import { ArrowButton, Interaction } from "../../../Common/Interactions";
import {
  ContentBox,
  InnerContainer,
  PostActions,
  PostCardContainer,
} from "../PostCard.style";
import { PostProfileBox } from "../PostProfile";
import { CustomBody, CustomThumbnail } from "./CommunityPostCard.style";
import { useNavigate } from "react-router-dom";
import { Divider } from "../../Card.style";

function CommunityPostCard({
  id,
  title,
  content,
  name,
  job,
  email,
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
    <>
      <PostCardContainer height="232px" onClick={handleNavigation}>
        <InnerContainer>
          <CustomThumbnail>
            {img ? (
              <img src={img[imgIndex].url} alt={`img ${imgIndex}`} />
            ) : null}
          </CustomThumbnail>
          <CustomBody>
            <PostActions>
              <PostProfileBox name={name} job={job} email={email} />
              <Interaction count={count} />
            </PostActions>
            <Divider />
            <ContentBox>
              <p>{title}</p>
              <p>{content}</p>
            </ContentBox>
            <Divider />

            <ArrowButton
              handlePrevImage={(e) => handlePrevImage(e)}
              handleNextImage={(e) => handleNextImage(e)}
            />
          </CustomBody>
        </InnerContainer>
      </PostCardContainer>
    </>
  );
}

export default CommunityPostCard;
