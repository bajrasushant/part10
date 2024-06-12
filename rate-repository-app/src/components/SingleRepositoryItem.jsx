import { useParams } from "react-router-native";
import Text from "./Text";
import useRepository from "../hooks/useRepository";
import RepositoryItem from "./RepositoryItem";
import { FlatList, View } from "react-native";
import useReviews from "../hooks/useReviews";
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
  const {
    repository,
    loading: repoLoading,
    error: repoError,
  } = useRepository(repoId);

  const {
    reviews,
    loading: reviewsLoading,
    error: reviewsError,
  } = useReviews(repoId);

  if (repoLoading || reviewsLoading) return null;
  if (repoError || reviewsError) return <Text>Error fetching data</Text>;

  const reviewNodes = reviews ? reviews.edges.map((edge) => edge.node) : [];

  return (
    <FlatList
      data={reviewNodes}
      renderItem={({ item }) => <ReviewItem review={item} />}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={() => (
        <RepositoryInfo repository={repository} />
      )}
    />
  );
};

export default SingleRepositoryItem;
