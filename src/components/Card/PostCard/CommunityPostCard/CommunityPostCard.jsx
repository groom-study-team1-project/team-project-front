import React, { useState } from "react";
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
    const [imgIndex, setImgIndex] = useState(0);
    const payload = useJwt(
        useSelector((state) => state.user.userInfo.accessToken)
    );
    const memberId = payload.memberId;

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

    const processContent = (htmlContent) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlContent, "text/html");
        const imgElements = doc.querySelectorAll("img");

        imgElements.forEach((img) => {
            const imgSrc = img.getAttribute("src");
            if (imgSrc) {
                img.replaceWith(`[` + imgSrc + `]`);
            }
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
                                src="https://via.placeholder.com/150?text=None"
                                alt="Default Thumbnail"
                                style={{ maxWidth: "100%", height: "100%", objectFit: "cover" }}
                            />
                        )}
                    </CustomThumbnail>

                    <CustomBody>
                        <PostActions>
                            <PostProfileBox name={name} job={job} memberId={memberId} imgUrl={img}/>
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
                            <p>{truncateText(title, 30)}</p>
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
