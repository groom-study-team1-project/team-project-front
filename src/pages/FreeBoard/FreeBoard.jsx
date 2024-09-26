import React, { useEffect, useState } from "react";
import { fetchPostItems } from "../../services/api";
import {
  fetchSearchTitle,
  fetchSearchMember,
  fetchSearchTag,
} from "../../services/searchApi";
import BoardLayout from "../../Layout/BoardLayout/BoardLayout";
import CommunityPostCard from "../../components/Card/PostCard/CommunityPostCard/CommunityPostCard";

function FreeBoard() {
  const [postItems, setPostItems] = useState([]);

  const fetchData = async (searchTerm, filter) => {
    try {
      let postItems;

      if (searchTerm) {
        if (filter === "title") {
          postItems = await fetchSearchTitle("free", searchTerm);
        } else if (filter === "author") {
          postItems = await fetchSearchMember("free", searchTerm);
        } else if (filter === "hashtag") {
          postItems = await fetchSearchTag("free", searchTerm);
        }
      } else {
        postItems = await fetchPostItems();
      }
      console.log(postItems);
      console.log(searchTerm, filter);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPostItems()
      .then((data) => setPostItems(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <BoardLayout category={{ title: "자유게시판", id: 1 }} onSearch={fetchData}>
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

export default FreeBoard;
