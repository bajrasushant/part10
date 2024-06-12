import { FlatList, Pressable, StyleSheet, View } from "react-native";
import RepositoryItem from "./RepositoryItem";
import { useNavigate } from "react-router-native";
import useRepositories from "../hooks/useRepositories";
import { useState, Component } from "react";
import { availableSortingOptions, sortParams } from "../utils/sortingOptions";
import SortingOption from "./SortingOption";
import SearchBar from "./SearchBar";
import { useDebounce } from "use-debounce";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

export const ItemSeparator = () => <View style={styles.separator} />;

export class RepositoryListContainer extends Component {
  renderHeader = () => {
    const { searchQuery, handleSearchQueryChange, sortChosen, handleSortOptionChosenChange } = this.props;
    return (
      <>
        <SearchBar
          searchQuery={searchQuery}
          handleSearchQueryChange={handleSearchQueryChange}
        />
        <SortingOption
          sortChosen={sortChosen}
          handleSortOptionChosenChange={handleSortOptionChosenChange}
        />
      </>
    );
  };

  render() {
    const { repositories, navigate } = this.props;
    const repositoryNodes = repositories
      ? repositories.edges.map((edge) => edge.node)
      : [];

    return (
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        ListHeaderComponent={this.renderHeader}
        ListHeaderComponentStyle={{
          zIndex: 2,
        }}
        renderItem={({ item }) => (
          <Pressable onPress={() => navigate(`/aboutRepo/${item.id}`)}>
            <RepositoryItem repository={item} showGithubButton={false} />
          </Pressable>
        )}
      />
    )
  }
}


const RepositoryList = () => {
  const [sortChosen, setSortChosen] = useState(availableSortingOptions[0]);

  const [searchQuery, setSearchQuery] = useState("");

  const currentSortParam = sortParams[sortChosen];

  const handleSortOptionChosenChange = (option) => {
    setSortChosen(option);
  };

  const handleSearchQueryChange = (value) => {
    setSearchQuery(value);
  };

  const [searchKeyword] = useDebounce(searchQuery, 500);

  const { repositories } = useRepositories({...currentSortParam, searchKeyword});

  const navigate = useNavigate();

  return (
    <RepositoryListContainer
      repositories={repositories}
      navigate={navigate}
      sortChosen={sortChosen}
      handleSortOptionChosenChange={handleSortOptionChosenChange}
      searchQuery={searchQuery}
      handleSearchQueryChange={handleSearchQueryChange}
    />
  );
};

export default RepositoryList;
