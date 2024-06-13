import { useApolloClient, useMutation } from "@apollo/client";
import { SIGNIN } from "../graphql/mutations";
import useAuthStorage from "./useAuthStorage";

const useSignIn = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const [mutate, result] = useMutation(SIGNIN);

  const signIn = async ({ username, password }) => {
    try{
    const { data } = await mutate({ variables: { credentials: { username, password } } });
    await authStorage.setAccessToken(data.authenticate.accessToken);
    apolloClient.resetStore();
    return data;
    }catch(err){
      console.error(err);
      throw err;
    }
  };

  return [signIn, result];
};

export default useSignIn;
