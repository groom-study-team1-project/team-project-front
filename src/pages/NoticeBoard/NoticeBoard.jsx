import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer"; // Intersection Observer
import { fetchNoticePostItems } from "../../services/api";
import BoardLayout from "../../Layout/BoardLayout/BoardLayout";
import NoticePostCard from "../../components/Card/PostCard/NoticePostCard/NoticePostCard";

function NoticeBoard() {
  const [postItems, setPostItems] = useState([]); // 전체 포스트 아이템
  const [visibleItems, setVisibleItems] = useState([]); // 화면에 표시될 포스트들
  const [page, setPage] = useState(1); // 현재 페이지
  const itemsPerPage = 10; // 한 번에 보여줄 포스트 수
  const [hasMore, setHasMore] = useState(true); // 더 불러올 데이터가 있는지 여부
  const { ref, inView } = useInView({
    threshold: 1, // 감시 대상이 100% 보일 때 트리거
    triggerOnce: false, // 여러 번 트리거 가능
  }); // 감시 요소
  console.log(1);
  // 처음 데이터를 불러옴
  useEffect(() => {
    // 데이터를 불러오는 함수
    console.log("useEffect triggered"); // 확인용 콘솔 로그
    const fetchData = async () => {
      try {
        console.log("Fetching data..."); // 확인용 콘솔 로그
        const allPosts = await fetchNoticePostItems();

        if (!allPosts || allPosts.length === 0) {
          console.log("No posts fetched or posts array is empty.");
        } else {
          console.log("Fetched all posts:", allPosts);
        }

        setPostItems(allPosts); // 전체 데이터를 저장
        setVisibleItems(allPosts.slice(0, itemsPerPage)); // 처음 10개 데이터를 화면에 표시

        if (allPosts.length <= itemsPerPage) {
          setHasMore(false); // 불러올 데이터가 없으면 hasMore를 false로 설정
        }

        console.log("Initial visible items:", allPosts.slice(0, itemsPerPage));
      } catch (err) {
        console.log("Error fetching posts:", err);
      }
    };
    fetchData();
  }, []); // 의존성 배열이 비어 있음, 처음 렌더링 시 한 번만 실행

  // 감시 요소가 보일 때마다 새로운 데이터를 추가로 보여줌
  useEffect(() => {
    console.log("inView status:", inView, "Has more:", hasMore);
    if (inView && hasMore) {
      const startIndex = page * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;

      console.log(`Fetching posts for page ${page}`);
      console.log(`Start Index: ${startIndex}, End Index: ${endIndex}`);

      if (postItems.length > startIndex) {
        const newPosts = postItems.slice(startIndex, endIndex);
        console.log("New posts to add:", newPosts);

        setVisibleItems((prevItems) => [...prevItems, ...newPosts]);
        setPage((prevPage) => prevPage + 1);
      } else {
        console.log("No more posts to load.");
        setHasMore(false); // 더 이상 데이터가 없으면 종료
      }
    }
  }, [inView, hasMore, page, postItems]);

  return (
    <BoardLayout category={{ title: "공지사항", id: 4 }}>
      {visibleItems.map((postItem) => (
        <NoticePostCard
          key={postItem.id}
          id={postItem.id}
          title={postItem.title}
          date={postItem.date}
          count={postItem.count}
        />
      ))}

      {/* 감시 요소 */}
      {hasMore && (
        <div ref={ref} style={{ padding: "20px", textAlign: "center" }}>
          Loading more...
        </div>
      )}
    </BoardLayout>
  );
}

export default NoticeBoard;
