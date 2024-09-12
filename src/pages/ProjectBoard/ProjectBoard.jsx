import React, { useEffect, useState } from "react";
import { fetchPostItems } from "../../services/api";
import BoardLayout from "../../Layout/BoardLayout/BoardLayout";
import ProjectPostCard from "../../components/Card/PostCard/ProjectPostCard/ProjectPostCard";

function ProjectBoard() {
  const [postItems, setPostItems] = useState([]);

  useEffect(() => {
    fetchPostItems()
      .then((data) => setPostItems(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <BoardLayout title={"프로젝트 게시판"}>
      {postItems.map((postItem) => (
        <ProjectPostCard
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

export default ProjectBoard;
