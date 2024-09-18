import React, { useEffect, useState } from "react";
import { fetchNoticePostItems } from "../../services/api";
import {
  fetchSearchTitle,
  fetchSearchMember,
  fetchSearchTag,
} from "../../services/searchApi";
import BoardLayout from "../../Layout/BoardLayout/BoardLayout";
import NoticePostCard from "../../components/Card/PostCard/NoticePostCard/NoticePostCard";

function NoticeBoard() {
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
        postItems = await fetchNoticePostItems();
      }
      console.log(postItems);
      console.log(searchTerm, filter);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchNoticePostItems()
      .then((data) => setPostItems(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <BoardLayout category={{ title: "공지사항", id: 4 }} onSearch={fetchData}>
      {postItems.map((postItem) => (
        <NoticePostCard
          key={postItem.id}
          id={postItem.id}
          title={postItem.title}
          date={postItem.date}
          count={postItem.count}
        />
      ))}
    </BoardLayout>
  );
}

export default NoticeBoard;
