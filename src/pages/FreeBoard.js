import React, { useEffect, useState } from "react";
import { fetchPostItems } from "../services/api";
import BoardLayout from "../components/Layout/BoardLayout";
import CommunityPostCard from "../components/Common/CommunityPostCard";

function FreeBoard() {
  const [postCards, setPostCards] = useState([]);

  useEffect(() => {
    fetchPostItems()
      .then((postItems) => {
        // 받아온 데이터를 기반으로 PostCard 컴포넌트 생성
        const cards = postItems.map((post) => (
          <CommunityPostCard
            key={post.id}
            title={post.title}
            content={post.content}
            name={post.name}
            job={post.job}
            count={post.count}
          />
        ));
        setPostCards(cards);
      })
      .catch((err) => console.log(err));
  }, []);

  return <BoardLayout postCards={postCards} />;
}

export default FreeBoard;
