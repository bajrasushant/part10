import { useApolloClient } from "@apollo/client";
import useAuthStorage from "./useAuthStorage";
import { useSetUser } from "../contexts/SignedInUserContext";

const useSignOut = () => {
  const dispatch = useSetUser();
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const signOut = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
    dispatch({ type: "SIGNOUT" });
  };

  return signOut;
};

export default useSignOut;
