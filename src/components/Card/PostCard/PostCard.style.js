import styled from "styled-components";

export const ContentBox = styled.div`
    flex-grow: 1;
    overflow: hidden; /* ContentBox 안에서 내용이 넘치지 않도록 설정 */
    text-overflow: ellipsis; /* 텍스트가 넘칠 경우 생략 표시 */
`;

export const Thumbnail = styled.div`
    flex-grow: 1;
    max-width: 260px;
    max-height: 200px;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.05), 0 15px 30px rgba(0, 0, 0, 0.15),
    0 20px 40px rgba(0, 0, 0, 0.25);

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    @media (max-width: 210px) {
        display: none;
    }
`;

export const PostCardContainer = styled.div`
    position: relative;
    display: flex;
    width: ${({ width }) => width || "100%"};
    height: ${({ height }) => height || "auto"};
    aspect-ratio: 1/1.5;
    cursor: pointer;
    transition: transform 450ms;


    /* &:hover {
        transform: scale(1.025);
      } */
`;

export const PostTitle = styled.h1`
    font-size: 1.5rem;
`;

export const InnerContainer = styled.div`
    display: flex;
    flex-direction: ${({ direction }) => direction || "row"};
    flex-grow: 1;
    padding: 16px;
    border-radius: 10px;
    background: ${({ isDarkMode }) =>
            isDarkMode
                    ? "linear-gradient(\n    to bottom,\n    rgba(0, 0, 0, 0.6),\n    rgba(0, 0, 0, 0.5)\n  );"
                    : "linear-gradient(\n    to bottom,\n    rgba(255, 255, 255, 0.6),\n    rgba(255, 255, 255, 0.5)\n  );"};
    backdrop-filter: blur(20px);

}

& > div:first-child {
    flex: 1; /* CustomThumbnail의 비율 */
}

& > div:last-child {
    flex: 2; /* CustomBody의 비율 */
}
`;

export const ProjectInnerContainer = styled.div`
    display: flex;
    flex-direction: ${({ direction }) => direction || "row"};
    flex-grow: 1;
    padding: 16px;
    border-radius: 10px;
    background: ${({ isDarkMode }) =>
            isDarkMode
                    ? "linear-gradient(\n    to bottom,\n    rgba(0, 0, 0, 0.6),\n    rgba(0, 0, 0, 0.5)\n  );"
                    : "linear-gradient(\n    to bottom,\n    rgba(255, 255, 255, 0.6),\n    rgba(255, 255, 255, 0.5)\n  );"};
    max-width: 800px;
    overflow: hidden;
    backdrop-filter: blur(20px);

}
`;

export const Body = styled.div`
    display: flex;
    flex-grow: 1;
    gap: 10px;
    flex-direction: column;
    padding: 10px 10px 0 10px;
`;

export const PostActions = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
`;
