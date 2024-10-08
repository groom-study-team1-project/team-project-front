export async function fetchPopularPostItems() {
  return [
    {
      id: 1,
      title: "Title 1",
      count: {
        view: 1,
        like: 11,
        comment: 111,
      },
    },
    {
      id: 2,
      title: "Title 2",
      count: {
        view: 2,
        like: 22,
        comment: 222,
      },
    },
    {
      id: 3,
      title: "Title 3",
      count: {
        view: 3,
        like: 33,
        comment: 333,
      },
    },
    {
      id: 4,
      title: "Title 4",
      count: {
        view: 4,
        like: 44,
        comment: 444,
      },
    },
    {
      id: 5,
      title: "Title 5",
      count: {
        view: 5,
        like: 55,
        comment: 555,
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
