import { useApolloClient } from "@apollo/client";
import useAuthStorage from "./useAuthStorage";
import { useSetUser } from "../contexts/SignedInUserContext";
import { useNavigate } from "react-router-native";

const useSignOut = () => {
  const dispatch = useSetUser();
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const navigate = useNavigate();

  const signOut = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
    dispatch({ type: "SIGNOUT" });
    navigate('/signin');
  };

  return signOut;
};

export default useSignOut;
