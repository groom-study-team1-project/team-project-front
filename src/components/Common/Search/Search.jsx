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

function Search({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("title");
  const [isChangeOption, setIsChangeOption] = useState(false);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSearch(searchTerm, filter);
    }
  };

  const handleFilterChange = (value) => {
    setFilter(value);
    setIsChangeOption(false);
  };

  return (
    <SearchWrapper>
      <SearchBox>
        <InnerSearch
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search"
        />
        <SearchIcon
          src={searchIcon}
          onClick={() => onSearch(searchTerm, filter)}
        />
      </SearchBox>
      <OptionContainer>
        <OptionToggle onClick={() => setIsChangeOption(!isChangeOption)}>
          {filter === "title"
            ? "제목"
            : filter === "author"
            ? "작성자"
            : "해시태그"}
          <OptionIcon
            src={optionIcon}
            onClick={() => setIsChangeOption(!isChangeOption)}
          />
        </OptionToggle>
        {isChangeOption && (
          <OptionList onClick={() => setIsChangeOption(!isChangeOption)}>
            <OptionItem
              value="title"
              onClick={() => handleFilterChange("title")}
            >
              제목
            </OptionItem>
            <OptionItem
              value="author"
              onClick={() => handleFilterChange("author")}
            >
              작성자
            </OptionItem>
            <OptionItem
              value="hashtag"
              onClick={() => handleFilterChange("hashtag")}
            >
              해시태그
            </OptionItem>
          </OptionList>
        )}
      </OptionContainer>
    </SearchWrapper>
  );
}

export default Search;
