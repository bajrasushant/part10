import { useMutation } from "@apollo/client";
import { CREATE_REVIEW } from "../graphql/mutations";
import { GET_REPOSITORY } from "../graphql/queries";

const useCreateReview = () => {
  const [createReview, result] = useMutation(CREATE_REVIEW, {
    onError: (error) => {
      const messages = error.graphQLErrors.map((e) => e.message).join("\n");
      console.error(messages);
    },
    refetchQueries: (mutationResult) => {
      const repositoryId = mutationResult.data.createReview.repositoryId;
      return [
        {
          query: GET_REPOSITORY,
          variables: { id: repositoryId },
        },
      ];
    },
  });
  return [createReview, result];
};

export default useCreateReview;
