import { useMutation } from "@apollo/client";
import { DELETE_REVIEW } from "../graphql/mutations";
import { USER } from "../graphql/queries";

const useReviewDelete = () => {
  const [mutate, result] = useMutation(DELETE_REVIEW);

  const deleteReview = async (deleteReviewId) => {
    await mutate({
      variables: { deleteReviewId },
      refetchQueries: [
        {
          query: USER,
          variables: { includeReviews: true },
        },
      ],
    });
  };

  return [deleteReview, result];
};

export default useReviewDelete;
