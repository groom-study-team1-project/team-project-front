import React, { useEffect, useState } from "react";
import { fetchNoticePostItems } from "../../services/api";
import BoardLayout from "../../Layout/BoardLayout/BoardLayout";
import NoticePostCard from "../../components/Card/PostCard/NoticePostCard/NoticePostCard";

function NoticeBoard() {
  const [postCards, setPostCards] = useState([]);

  useEffect(() => {
    fetchNoticePostItems()
      .then((postItems) => {
        // 받아온 데이터를 기반으로 PostCard 컴포넌트 생성
        const cards = postItems.map((post) => (
          <NoticePostCard
            key={post.id}
            id={post.id}
            title={post.title}
            date={post.date}
            count={post.count}
          />
        ));
        setPostCards(cards);
      })
      .catch((err) => console.log(err));
  }, []);

  return <BoardLayout postCards={(postCards, postCards, postCards)} />;
}

export default NoticeBoard;
