import { sortPostsByCriteria } from "../../../services/postApi";
import { SortOption } from "./SortOptionButton.style";

function SortOptionButton() {
  const handleSortChange = (e) => {
    const value = e.target.value;
    if (value === "date") {
      sortPostsByCriteria(1, "date", 0);
    } else if (value === "like") {
      sortPostsByCriteria(1, "like", 0);
    }
  };

  <SortOption
    onChange={(e) => {
      handleSortChange(e);
    }}
  >
    <option value="date">최신순</option>
    <option value="like">인기순</option>
  </SortOption>;
}

export default SortOptionButton;
