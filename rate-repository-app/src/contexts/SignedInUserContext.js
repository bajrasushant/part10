import { createContext, useContext, useEffect, useReducer } from "react";
import useAuthStorage from "../hooks/useAuthStorage";

const signedInUserReducer = (state, action) => {
  switch (action.type) {
    case "SIGNIN":
      return true;
    case "SIGNOUT":
      return false;
    default:
      return state;
  }
};

const SignedInUserContext = createContext();

export const SignedInUserContextProvider = (props) => {
  const [user, userDispatch] = useReducer(signedInUserReducer, false);
  const authStorage = useAuthStorage();
  useEffect(() => {
    const checkAccessToken = async () => {
      const accessToken = await authStorage.getAccessToken();
      if (accessToken) {
        userDispatch({ type: "SIGNIN" });
      }
    }
    checkAccessToken();
  }, []);
  return (
    <SignedInUserContext.Provider value={[user, userDispatch]}>
      {props.children}
    </SignedInUserContext.Provider>
  );
};

export const useUser = () => {
  const userAndDispatch = useContext(SignedInUserContext);
  return userAndDispatch[0];
};

export const useSetUser = () => {
  const userAndDispatch = useContext(SignedInUserContext);
  return userAndDispatch[1];
};

export default SignedInUserContext;
