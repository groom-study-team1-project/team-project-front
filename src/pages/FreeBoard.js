import React, { useEffect, useState } from "react";
import PostCard from "../components/Common/PostCard";
import { fetchPostItems } from "../services/api";

function FreeBoard() {
  const [postItems, setPostItems] = useState([]);

  useEffect(() => {
    fetchPostItems()
      .then((postItems) => setPostItems(postItems))
      .catch((err) => console.log(err));
  });

  return (
    <>
      {postItems.map((post) => (
        <PostCard
          key={post.id}
          title={post.title}
          content={post.content}
          name={post.name}
          job={post.job}
          count={post.count}
        />
      ))}
    </>
  );
}

export default FreeBoard;
