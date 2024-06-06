import { useQuery } from "@apollo/client";
import { GET_REVIEWS_ON_REPO } from "../graphql/queries";

const useReviews = (id) => {
  const { loading, error, data } = useQuery(GET_REVIEWS_ON_REPO, {
    variables: { repositoryId: id },
    fetchPolicy: "cache-and-network",
  });

  return { loading, error, reviews: data?.repository?.reviews };
};

export default useReviews;
