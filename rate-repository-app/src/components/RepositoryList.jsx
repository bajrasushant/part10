import { FlatList, Pressable, StyleSheet, View } from "react-native";
import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";
import Text from "./Text";
import { useNavigate } from "react-router-native";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

export const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories, navigate}) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <Pressable onPress={() => navigate(`/aboutRepo/${item.id}`)}>
          <RepositoryItem repository={item} showGithubButton={false} />
        </Pressable>
      )}
    />
  );
};

const RepositoryList = () => {
  const { loading, error, repositories } = useRepositories();
  const navigate = useNavigate();
  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error fetching data</Text>;

  return <RepositoryListContainer repositories={repositories} navigate={navigate} />;
};

export default RepositoryList;
