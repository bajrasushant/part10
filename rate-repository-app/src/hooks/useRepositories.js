import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = ({ orderBy, orderDirection, searchKeyword }) => {
  const variables = { orderBy, orderDirection, searchKeyword };
  const { loading, error, data } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network",
    variables
  });

  return { loading, error, repositories: data?.repositories };
};

export default useRepositories;
