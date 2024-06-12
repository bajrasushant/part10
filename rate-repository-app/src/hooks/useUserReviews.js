import { useQuery } from "@apollo/client";
import { USER } from "../graphql/queries";

const useUserReviews = () => {
  const { loading, error, data } = useQuery(USER, {
    variables: { includeReviews: true },
    fetchPolicy: "cache-and-network",
  });
  return { loading, error, reviews: data?.me?.reviews };
};

export default useUserReviews;
