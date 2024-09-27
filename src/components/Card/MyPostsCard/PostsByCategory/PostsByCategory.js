import {
  BoardContent,
  BoardContentsWrap,
  LoadMore,
  Myboard,
} from "./PostsByCategory.style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { Interaction } from "../../../Common/Interactions";
import { useState } from "react";
import { PostProfileBox } from "../../PostCard/PostProfile";

const PostsByCategory = ({
  id,
  board,
  contents,
  onLoadMore,
  lastPostId,
  postCount,
}) => {
  const [hidden, setHidden] = useState(true);

  const onClickhandler = () => {
    setHidden(!hidden);
  };

  return (
    <div>
      <Myboard
        onClick={() => {
          onClickhandler();
        }}
      >
        <div>{board}</div>
        <div>
          <span style={{ marginLeft: "5px" }}>
            <FontAwesomeIcon icon={faAngleDown} />
          </span>
        </div>
      </Myboard>
      {!hidden
        ? contents.map((content) => (
            <BoardContentsWrap key={content.id}>
              <PostProfileBox
                name={content.memberNickname}
                job={content.memberJob}
                memberId={content.memberId}
              />
              <BoardContent>{content.title}</BoardContent>
              <Interaction count={content.count} />
            </BoardContentsWrap>
          ))
        : null}
      {!hidden && lastPostId < postCount ? (
        <LoadMore onClick={onLoadMore}>게시글 더보기</LoadMore>
      ) : null}
    </div>
  );
};

export default PostsByCategory;
