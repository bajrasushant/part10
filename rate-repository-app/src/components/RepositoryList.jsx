import { FlatList, Pressable, StyleSheet, View } from "react-native";
import RepositoryItem from "./RepositoryItem";
import Text from "./Text";
import { useNavigate } from "react-router-native";
import useRepositories from "../hooks/useRepositories";
import { useState } from "react";
import { availableSortingOptions, sortParams } from "../utils/sortingOptions";
import SortingOption from "./SortingOption";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

export const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({
  repositories,
  navigate,
  sortChosen,
  handleSortOptionChosenChange,
}) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <>
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        ListHeaderComponent={
          <SortingOption
            sortChosen={sortChosen}
            handleSortOptionChosenChange={handleSortOptionChosenChange}
          />
        }
        ListHeaderComponentStyle={{
          zIndex: 2
        }}
        renderItem={({ item }) => (
          <Pressable onPress={() => navigate(`/aboutRepo/${item.id}`)}>
            <RepositoryItem repository={item} showGithubButton={false} />
          </Pressable>
        )}
      />
    </>
  );
};

const RepositoryList = () => {
  const [sortChosen, setSortChosen] = useState(availableSortingOptions[0]);

  const currentSortParam = sortParams[sortChosen];

  const { loading, error, repositories } = useRepositories(currentSortParam);

  const handleSortOptionChosenChange = (option) => {
    setSortChosen(option);
  };

  const navigate = useNavigate();
  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error fetching data</Text>;

  return (
    <RepositoryListContainer
      repositories={repositories}
      navigate={navigate}
      sortChosen={sortChosen}
      handleSortOptionChosenChange={handleSortOptionChosenChange}
    />
  );
};

export default RepositoryList;
