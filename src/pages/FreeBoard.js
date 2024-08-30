import React, { useEffect, useState } from "react";
import { fetchPostItems } from "../services/api";
import CommunityPostCard from "../components/Common/CommunityPostCard";
import PopularPostCard from "../components/Common/PopularPostCard";
import PopularHashCard from "../components/Common/PopularHashCard";
import SideBar from "../components/Common/SideBar";

function FreeBoard() {
  const [postItems, setPostItems] = useState([]);

  useEffect(() => {
    fetchPostItems()
      .then((postItems) => setPostItems(postItems))
      .catch((err) => console.log(err));
  });

  return (
    <>
      {/* FreeBoard */}
      <SideBar />
      {postItems.map((post) => (
        <CommunityPostCard
          key={post.id}
          title={post.title}
          content={post.content}
          name={post.name}
          job={post.job}
          count={post.count}
        />
      ))}
      <PopularPostCard />
      <PopularHashCard />
    </>
  );
}

export default FreeBoard;
