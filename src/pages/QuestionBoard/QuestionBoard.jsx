import React, { useEffect, useState } from "react";
import { fetchPostItems } from "../../services/api";
import BoardLayout from "../../Layout/BoardLayout/BoardLayout";
import CommunityPostCard from "../../components/Card/PostCard/CommunityPostCard/CommunityPostCard";

function QuestionBoard() {
  const [postItems, setPostItems] = useState([]);

  useEffect(() => {
    fetchPostItems()
      .then((data) => setPostItems(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <BoardLayout title={"질문 게시판"}>
      {postItems.map((postItem) => (
        <CommunityPostCard
          key={postItem.id}
          title={postItem.title}
          content={postItem.content}
          name={postItem.name}
          job={postItem.job}
          count={postItem.count}
        />
      ))}
    </BoardLayout>
  );
}

export default QuestionBoard;
