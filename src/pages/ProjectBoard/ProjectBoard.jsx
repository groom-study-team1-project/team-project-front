import React, { useEffect, useState } from "react";
import { fetchPostItems } from "../../services/api";
import { searchPosts } from "../../services/searchApi";
import BoardLayout from "../../Layout/BoardLayout/BoardLayout";
import ProjectPostCard from "../../components/Card/PostCard/ProjectPostCard/ProjectPostCard";

function ProjectBoard() {
  const [postCards, setPostCards] = useState([]);

  const fetchData = async (searchTerm) => {
    try {
      const postItems = searchTerm
        ? await searchPosts("free", searchTerm)
        : await fetchPostItems();

      const cards = postItems.map((post) => (
        <ProjectPostCard
          key={post.id}
          title={post.title}
          content={post.content}
          name={post.name}
          job={post.job}
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
      pageType="projects"
      onSearchResults={fetchData}
    />
  );
}

export default ProjectBoard;
