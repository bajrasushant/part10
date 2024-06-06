import { useMutation } from "@apollo/client";
import { CREATE_REVIEW } from "../graphql/mutations";
import { GET_REPOSITORY } from "../graphql/queries";

const useCreateReview = () => {
  const [createReview, result] = useMutation(CREATE_REVIEW, {
    onError: (error) => {
      const messages = error.graphQLErrors.map((e) => e.message).join("\n");
      console.error(messages);
    },
    update: (cache, response) => {
      cache.updateQuery({ query: GET_REPOSITORY }, ({ repository }) => {
        return {
          repository: repository.concat(response.data.createReview),
        };
      });
    },
  });
  return [createReview, result];
};

export default useCreateReview;
