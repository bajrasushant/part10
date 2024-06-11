import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = ({ orderBy, orderDirection }) => {
  const variables = { orderBy };
  if (orderDirection) {
    variables.orderDirection = orderDirection;
  }
  const { loading, error, data } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network",
    variables
  });

  return { loading, error, repositories: data?.repositories };
};

export default useRepositories;
