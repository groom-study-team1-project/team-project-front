import React, { useEffect, useRef, useState } from "react";
import CommunityPostCard from "../../../components/Card/PostCard/CommunityPostCard/CommunityPostCard";
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
import { useDispatch } from "react-redux";
import { setAllPostItems } from "../../../store/post/postSlice";
import { BarLoading } from "../../../components/Common/LodingSpinner";

function FreeBoard() {
    const [postItems, setPostItems] = useState([]);
    const [lastPostIdByCategory, setLastPostIdByCategory] = useState(null);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [isMobile, setIsMobile] = useState(false);
    const isThrottleActive = useRef(false);
    const listRef = useRef(null);

    const dispatch = useDispatch();
    const categoryId = 1;
    const limit = 10;

    const fetchData = async () => {
        if (loading || !hasMore || isThrottleActive.current) return;
        setLoading(true);
        isThrottleActive.current = true;

        setTimeout(async () => {
            try {
                const { posts } = await fetchPostItems(categoryId, lastPostIdByCategory);
                const filteredPosts = posts.filter(
                    (post) => post.categoryId === categoryId
                );
                if (filteredPosts.length > 0) {
                    setPostItems((prevPosts) => [...prevPosts, ...filteredPosts]);
                    const newLastPostId = filteredPosts[filteredPosts.length - 1].postId;
                    setLastPostIdByCategory(newLastPostId);
                    dispatch(setAllPostItems([...postItems, ...filteredPosts]));
                }

                if (filteredPosts.length < limit) {
                    setHasMore(false);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
                isThrottleActive.current = false;
            }
        }, 1000);
    };

    useEffect(() => {
        fetchData();
    }, [dispatch]);

    useEffect(() => {
        // Detect screen size and adjust layout for mobile
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768); // Adjust breakpoint if necessary
        };

        handleResize();
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const handleScroll = (e) => {
        const { scrollTop, scrollHeight, clientHeight } = e.target;
        if (scrollHeight - scrollTop <= clientHeight + 100 && !loading && hasMore) {
            fetchData();
        }
    };

    useEffect(() => {
        const listElement = listRef.current;
        if (listElement) {
            listElement.addEventListener("scroll", handleScroll);
        }
        return () => {
            if (listElement) {
                listElement.removeEventListener("scroll", handleScroll);
            }
        };
    }, [lastPostIdByCategory, loading, hasMore]);

    return (
        <ContentWrapper>
            <BoardTitle>
                <Title>자유게시판</Title>
            </BoardTitle>
            <SearchSortWrapper>
                <Search />
                <SortOptionButton />
            </SearchSortWrapper>
            <PostCardWrapper
                ref={listRef}
                style={{
                    height: isMobile ? "650px" : "750px",
                    overflowY: "auto",
                    flexDirection: isMobile ? "column" : "row",
                }}
            >
                {postItems.map((postItem, index) => (
                    <CommunityPostCard
                        key={`${postItem.postId}-${index}`}
                        id={postItem.postId}
                        title={postItem.title}
                        content={postItem.content}
                        name={postItem.memberInfo.nickname}
                        job={"IOS Developer"}
                        count={postItem.countInfo}
                        img={postItem.imgUrl}
                    />
                ))}
                {loading && <BarLoading />}
                {!hasMore && <EndMessage>모든 게시글을 불러왔습니다.</EndMessage>}
            </PostCardWrapper>
        </ContentWrapper>
    );
}

export default FreeBoard;
