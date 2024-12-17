import React, { useEffect, useRef, useState, useCallback } from "react";
import {
    Title,
    BoardTitle,
    ContentWrapper,
    PostCardWrapper,
    SearchSortWrapper,
    EndMessage,
} from "../Board.style";
import Search from "../../../components/Common/Search/Search";
import SortOptionButton from "../../../components/Common/SortOptionButton/SortOptionButton";
import { fetchPostItems } from "../../../services/api/postApi";
import NoticePostCard from "../../../components/Card/PostCard/NoticePostCard/NoticePostCard";
import { BarLoading } from "../../../components/Common/LodingSpinner";

function NoticeBoard() {
    const [postItems, setPostItems] = useState([]);
    const [lastPostId, setLastPostId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const listRef = useRef(null);

    const categoryId = 4;
    const limit = 10;

    const fetchData = useCallback(() => {
        if (loading || !hasMore) return;

        setLoading(true);
        setTimeout(async () => {
            try {
                const { posts } = await fetchPostItems(categoryId, lastPostId, limit);
                if (posts.length > 0) {
                    setPostItems((prev) => [...prev, ...posts]);
                    setLastPostId(posts[posts.length - 1].postId);
                }
                if (posts.length < limit) setHasMore(false);
            } catch (error) {
                console.error("공지사항 게시판 데이터 요청 오류:", error);
            } finally {
                setLoading(false);
            }
        }, 1000);
    }, [loading, hasMore, lastPostId]);

    const handleScroll = useCallback((e) => {
        const { scrollTop, scrollHeight, clientHeight } = e.target;
        if (scrollHeight - scrollTop <= clientHeight + 100 && !loading && hasMore) {
            fetchData();
        }
    }, [fetchData, loading, hasMore]);

    useEffect(() => {
        const listElement = listRef.current;
        if (listElement) {
            listElement.addEventListener("scroll", handleScroll);
            if (lastPostId === null) fetchData();
        }
        return () => listElement && listElement.removeEventListener("scroll", handleScroll);
    }, [handleScroll, fetchData, lastPostId]);

    return (
        <ContentWrapper>
            <BoardTitle>
                <Title>공지사항</Title>
            </BoardTitle>
            <SearchSortWrapper>
                <Search />
                <SortOptionButton />
            </SearchSortWrapper>
            <PostCardWrapper ref={listRef} style={{ height: "750px", overflowY: "auto" }}>
                {postItems.map((postItem, index) => (
                    <NoticePostCard
                        key={`${postItem.postId}-${index}`}
                        id={postItem.postId}
                        title={postItem.title}
                        date={new Date(postItem.createdAt).toLocaleString("ko-KR")}
                        count={postItem.countInfo}
                    />
                ))}
                {loading && <BarLoading />}
                {!hasMore && <EndMessage>모든 게시글을 불러왔습니다.</EndMessage>}
            </PostCardWrapper>
        </ContentWrapper>
    );
}

export default NoticeBoard;
