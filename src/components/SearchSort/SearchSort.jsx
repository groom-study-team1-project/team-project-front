import React, { useState } from "react";
import {
  SearchSortWrapper,
  SearchBox,
  SortOption,
  InnerSearch,
  SearchIcon,
} from "../SearchSort/SearchSort.style";
import searchIcon from "../../assets/images/search.png";

function SearchSort({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSearch(searchTerm);
    }
  };

  return (
    <SearchSortWrapper>
      <SearchBox>
        <InnerSearch
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="검색어를 입력하세요"
        />
        <SearchIcon src={searchIcon} onClick={() => onSearch(searchTerm)} />
      </SearchBox>
      <SortOption>최신순</SortOption>
    </SearchSortWrapper>
  );
}

export default SearchSort;
