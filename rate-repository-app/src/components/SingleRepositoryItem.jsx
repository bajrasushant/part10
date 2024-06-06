import { useParams } from "react-router-native";
import Text from "./Text";
import useRepository from "../hooks/useRepository";
import RepositoryItem from "./RepositoryItem";

const SingleRepositoryItem = () => {
  const { repoId } = useParams();
  const { loading, error, repository } = useRepository(repoId);
  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error fetching data</Text>;

  return <RepositoryItem repository={repository} showGithubButton={true} />;
};

export default SingleRepositoryItem;
