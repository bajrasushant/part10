import React from "react";
import { FlatList } from "react-native";
import useUserReviews from "../hooks/useUserReviews";
import ReviewItem from "./ReviewItem";
import Text from "./Text";
import { ItemSeparator } from "./RepositoryList";
import { useNavigate } from "react-router-native";
import useReviewDelete from "../hooks/useReviewDelete";

const OwnReviews = () => {
  const { loading, error, reviews } = useUserReviews();

  const navigate = useNavigate();

  const [deleteReview] = useReviewDelete();

  if (loading) return null;
  if (error) return <Text>Error fetching data... </Text>;

  const reviewNodes = reviews ? reviews.edges.map((edge) => edge.node) : [];
  return (
    <FlatList
      data={reviewNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <ReviewItem
          review={item}
          personal
          navigate={navigate}
          deleteReview={deleteReview}
        />
      )}
    />
  );
};

export default OwnReviews;
