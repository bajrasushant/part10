import { Searchbar } from "react-native-paper";
import theme from "./theme";

const SearchBar = ({searchQuery, handleSearchQueryChange}) => {
  return (
    <Searchbar
      placeholder="Search"
      onChangeText={handleSearchQueryChange}
      value={searchQuery}
      elevation="2"
      style={{ backgroundColor: theme.colors.secondaryBackground, margin: 5, }}
      inputStyle={{minHeight: 0}}
    />
  );
};

export default SearchBar;
