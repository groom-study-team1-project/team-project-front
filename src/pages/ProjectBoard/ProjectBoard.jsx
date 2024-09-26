import React, { useEffect, useState } from "react";
import { fetchPostItems } from "../../services/api";
import BoardLayout from "../../Layout/BoardLayout/BoardLayout";
import ProjectPostCard from "../../components/Card/PostCard/ProjectPostCard/ProjectPostCard";
import {
  fetchSearchTitle,
  fetchSearchMember,
  fetchSearchTag,
} from "../../services/searchApi";

function ProjectBoard() {
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
    <BoardLayout
      category={{ title: "프로젝트 게시판", id: 3 }}
      onSearch={fetchData}
    >
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
