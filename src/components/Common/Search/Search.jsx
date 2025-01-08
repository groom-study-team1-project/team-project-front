import React, { useState } from "react";
import {
  SearchTagsContainer,
  SearchContainer,
  SearchInput,
  SearchInputWrapper,
  SearchButton,
  SortDropdown,
  TagsContainer,
  Tag,
  TagName,
  SearchIcon,
  PlaceholderIconWrapper,
} from "./Search.style";
import searchIcon from "../../../assets/images/search.png";
import search_reverse_Icon from "../../../assets/images/search_reverse.png";

function Search({ placeholder = "검색어를 입력하세요", onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchTerm); // 검색어만 전달
    }
  };

  return (
      <SearchTagsContainer>
        <SearchContainer>
          <SearchInputWrapper>
            <PlaceholderIconWrapper>
              <SearchIcon src={searchIcon} alt="검색 아이콘" />
            </PlaceholderIconWrapper>
            <SearchInput
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={placeholder}
            />
          </SearchInputWrapper>
          <SearchButton onClick={handleSearch}>
            <SearchIcon src={search_reverse_Icon} />
            검색
          </SearchButton>
          <SortDropdown>
            <select>
              <option value="최신순">최신순</option>
              <option value="인기순">인기순</option>
            </select>
          </SortDropdown>
        </SearchContainer>
        <TagsContainer>
          <TagName># 인기태그</TagName>
          <Tag onClick={() => setSearchTerm("React")}>#React</Tag>
          <Tag onClick={() => setSearchTerm("Spring")}>#Spring</Tag>
          <Tag onClick={() => setSearchTerm("AWS")}>#AWS</Tag>
        </TagsContainer>
      </SearchTagsContainer>
  );
}

export default Search;
