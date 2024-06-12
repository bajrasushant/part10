import React from "react";
import { FlatList } from "react-native";
import useUserReviews from "../hooks/useUserReviews";
import ReviewItem from "./ReviewItem";
import Text from "./Text";
import { ItemSeparator } from "./RepositoryList";

const OwnReviews = () => {
  const { loading, error, reviews } = useUserReviews();

  if (loading) return <Text>Loading....</Text>
  if (error) return <Text>Error fetching data... </Text>

  const reviewNodes = reviews ? reviews.edges.map((edge) => edge.node) : [];
  return (
    <FlatList
      data={reviewNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <ReviewItem review={item} personal />}
    />
  );
};

export default OwnReviews;
