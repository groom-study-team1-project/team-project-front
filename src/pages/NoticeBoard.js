import React, { useEffect, useState } from "react";
import { fetchNoticePostItems } from "../services/api";
import NoticePostCard from "../components/Feature/NoticePostCard";

function NoticeBoard() {
  const [postItems, setPostItems] = useState([]);

  useEffect(() => {
    fetchNoticePostItems()
      .then((postItems) => setPostItems(postItems))
      .catch((err) => console.log(err));
  });

  return (
    <>
      {postItems.map((post) => (
        <NoticePostCard
          key={post.id}
          id={post.id}
          title={post.title}
          date={post.date}
          count={post.count}
        />
      ))}
    </>
  );
}

export default NoticeBoard;
