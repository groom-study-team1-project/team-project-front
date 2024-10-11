export async function fetchPopularPostItems() {
  return [
    {
      id: 1,
      title: "Title 1",
      count: {
        viewCount: 1,
        likeCount: 11,
        commentCount: 111,
      },
    },
    {
      id: 2,
      title: "Title 2",
      count: {
        viewCount: 2,
        likeCount: 22,
        commentCount: 222,
      },
    },
    {
      id: 3,
      title: "Title 3",
      count: {
        viewCount: 3,
        likeCount: 33,
        commentCount: 333,
      },
    },
    {
      id: 4,
      title: "Title 4",
      count: {
        viewCount: 4,
        likeCount: 44,
        commentCount: 444,
      },
    },
    {
      id: 5,
      title: "Title 5",
      count: {
        viewCount: 5,
        likeCount: 55,
        commentCount: 555,
      },
    },
  ];
}

export async function fetchPopularHashItems() {
  return [
    {
      id: 1,
      hashtag: "해시태그 1",
      count: 11,
    },
    {
      id: 2,
      hashtag: "해시태그 2",
      count: 22,
    },
    {
      id: 3,
      hashtag: "해시태그 3",
      count: 33,
    },
    {
      id: 4,
      hashtag: "해시태그 4",
      count: 44,
    },
    {
      id: 5,
      hashtag: "해시태그 5",
      count: 55,
    },
  ];
}

export const createcomment = async (body) => {
  await console.log(body);
};

export const fetchcomment = async (postId) => {
  return {
    code: 1301,
    message: "댓글 조회에 성공하였습니다.",
    result: [
      {
        memberInfo: {
          Id: 0,
          nickname: "ALee",
          imageUrl: "~~~",
        },
        commentInfo: {
          content: "comment test",
          recommedCount: 0,
          createdAt: new Date().toLocaleDateString(),
          updatedAt: "수정일자",
          isModified: true,
        },
      },
      {
        memberInfo: {
          Id: 1,
          nickname: "MogensEgeskov",
          imageUrl: "~~~",
        },
        commentInfo: {
          content: "comment test1",
          recommedCount: 2,
          createdAt: new Date().toLocaleDateString(),
          updatedAt: "수정일자",
          isModified: false,
        },
      },
    ],
  };
};
