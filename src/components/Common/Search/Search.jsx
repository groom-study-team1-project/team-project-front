import React, { useState } from "react";
import {
  SearchWrapper,
  SearchBox,
  InnerSearch,
  SearchIcon,
  OptionIcon,
  OptionContainer,
  OptionToggle,
  OptionList,
  OptionItem,
} from "./Search.style";
import optionIcon from "../../../assets/images/option.png";
import searchIcon from "../../../assets/images/search.png";

function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("title");
  const [isChangeOption, setIsChangeOption] = useState(false);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  return (
    <SearchWrapper>
      <SearchBox>
        <InnerSearch
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="검색어를 입력하세요"
        />
        <SearchIcon src={searchIcon} />
      </SearchBox>
      {/* <SearchOption value={filter} onChange={handleFilterChange}>
        <option value="title">제목</option>
        <option value="author">작성자</option>
        <option value="hashtag">해시태그</option>
      </SearchOption> */}
    </SearchWrapper>
  );
}

export default Search;
