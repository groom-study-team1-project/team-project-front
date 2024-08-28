import React, { useEffect, useState } from "react";
import ProjectPostCard from "../components/Common/ProjectPostCard";
import { fetchPostItems } from "../services/api";

function ProjectBoard() {
  const [postItems, setPostItems] = useState([]);

  useEffect(() => {
    fetchPostItems()
      .then((postItems) => setPostItems(postItems))
      .catch((err) => console.log(err));
  });

  return (
    <>
      {postItems.map((post) => (
        <ProjectPostCard
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

export default ProjectBoard;
