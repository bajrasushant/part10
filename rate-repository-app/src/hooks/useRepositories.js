import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = ({ orderBy, orderDirection, searchKeyword, first, after }) => {
  const variables = { orderBy, orderDirection, searchKeyword, first, after };
  const { loading, error, data, fetchMore } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network",
    variables,
  });

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        ...variables,
        after: data.repositories.pageInfo.endCursor,
      },
    });
  };

  return {
    loading,
    error,
    repositories: data?.repositories,
    fetchMore: handleFetchMore,
  };
};

export default useRepositories;
