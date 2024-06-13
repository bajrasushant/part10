import { useParams } from "react-router-native";
import Text from "./Text";
import useRepository from "../hooks/useRepository";
import RepositoryItem from "./RepositoryItem";
import { FlatList, View } from "react-native";
import { ItemSeparator } from "./RepositoryList";
import ReviewItem from "./ReviewItem";

const RepositoryInfo = ({ repository }) => (
  <View>
    <RepositoryItem repository={repository} showGithubButton={true} />
    <ItemSeparator />
  </View>
);

const SingleRepositoryItem = () => {
  const { repoId } = useParams();
  const repositoryId = repoId;
  const { repository, reviews, loading, error, fetchMore } = useRepository({
    repositoryId,
    first: 4,
  });

  if (loading) return null;
  if (error) return <Text>Error fetching data</Text>;

  const reviewNodes = reviews ? reviews.edges.map((edge) => edge.node) : [];
  
  const onEndReach = () => {
    fetchMore();
  };

  return (
    <FlatList
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
      data={reviewNodes}
      renderItem={({ item }) => <ReviewItem review={item} />}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
    />
  );
};

export default SingleRepositoryItem;
