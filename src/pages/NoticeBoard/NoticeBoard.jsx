import React, { useEffect, useState } from "react";
import { fetchNoticePostItems } from "../../services/api";
import BoardLayout from "../../Layout/BoardLayout/BoardLayout";
import NoticePostCard from "../../components/Card/PostCard/NoticePostCard/NoticePostCard";

function NoticeBoard() {
  const [postItems, setPostItems] = useState([]);

  useEffect(() => {
    fetchNoticePostItems()
      .then((data) => setPostItems(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <BoardLayout title={"공지사항"}>
      {postItems.map((postItem) => (
        <NoticePostCard
          key={postItem.id}
          id={postItem.id}
          title={postItem.title}
          date={postItem.date}
          count={postItem.count}
        />
      ))}
    </BoardLayout>
  );
}

export default NoticeBoard;
