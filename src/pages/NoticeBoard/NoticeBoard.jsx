import React, { useEffect, useState } from "react";
import { fetchNoticePostItems } from "../../services/api";
import { searchPosts } from "../../services/searchApi";
import BoardLayout from "../../Layout/BoardLayout/BoardLayout";
import NoticePostCard from "../../components/Card/PostCard/NoticePostCard/NoticePostCard";

function FreeBoard() {
  const [postCards, setPostCards] = useState([]);

  const fetchData = async (searchTerm) => {
    try {
      const postItems = searchTerm
        ? await searchPosts("free", searchTerm)
        : await fetchNoticePostItems();

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
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <BoardLayout
      postCards={postCards}
      pageType="questions"
      onSearchResults={fetchData}
    />
  );
}

export default FreeBoard;
