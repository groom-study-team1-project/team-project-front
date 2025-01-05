import { Interaction } from "../../../Common/Interactions";
import {
  ContentBox,
  InnerContainer,
  PostActions,
  PostCardContainer,
  PostTitle,
} from "../PostCard.style";
import { PostProfileBox } from "../PostProfile";
import { CustomBody, CustomThumbnail } from "./CommunityPostCard.style";
import { useNavigate } from "react-router-dom";
import { Divider } from "../../Card.style";
import useJwt from "../../../../hooks/useJwt";
import { useSelector } from "react-redux";

function CommunityPostCard({
  id,
  title,
  content,
  name,
  job,
  img,
  count,
  thumbnail,
}) {
  const payload = useJwt(
    useSelector((state) => state.user.userInfo.accessToken)
  );
  const memberId = payload.memberId;

  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate(`/board/detail/${id}`);
  };

  const processContent = (htmlContent) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, "text/html");
    const textContent = doc.querySelectorAll("p");
    textContent.forEach((text) => {
      text.getAttribute("");
      text.replaceWith(text);
    });
    return doc.body.textContent || "";
  };

  const truncateText = (text, maxLength) => {
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  return (
    <>
      <PostCardContainer height="232px" onClick={handleNavigation}>
        <InnerContainer>
          <CustomThumbnail>
            {thumbnail ? (
              <img
                src={thumbnail}
                alt={`Thumbnail`}
                style={{ maxWidth: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              <img
                  src="https://deepdiver-community-files-dev.s3.ap-northeast-2.amazonaws.com/posts/thumbnail.png"
                  alt="Default Thumbnail"
                  style={{ maxWidth: "100%", height: "100%", objectFit: "cover" }}
              />
            )}
          </CustomThumbnail>

          <CustomBody>
            <PostActions>
              <PostProfileBox
                name={name}
                job={job}
                memberId={memberId}
                imgUrl={img}
              />
              <Interaction
                count={{
                  viewCount: count.viewCount,
                  likeCount: count.likeCount,
                  commentCount: count.commentCount,
                }}
              />
            </PostActions>
            <Divider />
            <ContentBox>
              <PostTitle>{truncateText(title, 30)}</PostTitle>
              <p>{truncateText(processContent(content), 100)}</p>
            </ContentBox>
            <Divider />
          </CustomBody>
        </InnerContainer>
      </PostCardContainer>
    </>
  );
}

export default CommunityPostCard;
