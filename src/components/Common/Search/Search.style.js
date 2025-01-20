import styled from "styled-components";

export const SearchTagsContainer = styled.div`
    display: flex;
    flex-direction: column; /* 세로로 구성 */
    padding: 10px 20px;
    background: ${({ isDarkMode }) =>
            isDarkMode
                    ? "linear-gradient(\n    to bottom,\n    rgba(0, 0, 0, 0.6),\n    rgba(0, 0, 0, 0.5)\n  );"
                    : "linear-gradient(to right, #e5e5f7, #ACB6E5)"};
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    position: relative;
    margin-bottom: 48px;
`;

export const SearchContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 20px;
    background: linear-gradient(
            to bottom,
            rgba(255, 255, 255, 0.6),
            rgba(255, 255, 255, 0.5)
    );
    backdrop-filter: blur(20px);
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    position: relative;
    flex-shrink: 0; /* 너비 고정을 위해 줄바꿈 방지 */
`;

export const SearchButton = styled.button`
    flex-shrink: 0; /* 버튼 크기 고정 */
    display: flex;
    align-items: center; /* 텍스트와 아이콘 수직 중앙 정렬 */
    justify-content: center; /* 텍스트와 아이콘 수평 중앙 정렬 */
    gap: 0px; /* 텍스트와 아이콘 간격 */
    padding: 8px 12px;
    background-color: #333;
    color: white;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

    font-size: 14px; /* 텍스트 크기 */
    line-height: 1; /* 아이콘과 텍스트의 높이를 맞추기 위해 설정 */

    &:hover {
        background-color: #555;
    }
`;


export const SortDropdown = styled.div`
    display: flex;
    align-items: center;
    position: relative;
    flex-shrink: 0; /* 정렬 옵션 크기 고정 */

    select {
        padding: 8px 10px;
        border: 1px solid #ddd;
        border-radius: 20px;
        font-size: 14px;
        background-color: white;
        cursor: pointer;

        &:hover {
            border-color: #aaa;
        }
    }
`;

export const TagsContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 10px;
    flex-wrap: wrap;
`;

export const TagName = styled.div`
    padding: 10px 15px;
    border: none;
    border-radius: 20px;
    background-color: white;
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
    font-size: 14px;
    outline: none;
    color: black;
`;

export const Tag = styled.div`
    display: inline-flex;
    align-items: center;
    padding: 5px 12px;
    background-color: white;
    border: 1px solid #ddd;
    border-radius: 20px;
    font-size: 12px;
    color: #555;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    cursor: pointer;

    &:hover {
        background-color: #f5f5f5;
    }
`;

export const SearchInputWrapper = styled.div`
    flex: 1;
    position: relative;
    display: flex;
    align-items: center;
`;

export const PlaceholderIconWrapper = styled.div`
    position: absolute;
    left: 12px; /* 아이콘 위치 설정 */
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none; /* 클릭 불가 */
`;

export const SearchInput = styled.input`
    flex: 1;
    padding: 10px 15px 10px 40px; /* 왼쪽 패딩으로 아이콘 공간 확보 */
    border: none;
    border-radius: 20px;
    background-color: white;
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
    font-size: 14px;
    outline: none;

    ::placeholder {
        color: #a0a0a0;
    }
`;

export const SearchIcon = styled.img`
    width: 16px;
    height: 16px;
`;

