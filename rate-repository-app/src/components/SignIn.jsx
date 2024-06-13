import { Alert, StyleSheet, View } from "react-native";
import theme from "./theme";
import * as yup from "yup";
import useSignIn from "../hooks/useSignin";
import { useNavigate } from "react-router-native";
import useAuthStorage from "../hooks/useAuthStorage";
import { useSetUser } from "../contexts/SignedInUserContext";
import FormikTextInput from "./FormikTextInput";
import SubmitButton from "./SubmitButton";
import { Formik } from "formik";

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.secondaryBackground,
    padding: 20,
  },
});

const validationSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

export const SignInForm = ({ handleSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput name="username" placeholder="Username" />
      <FormikTextInput name="password" placeholder="Password" secureTextEntry />
      <SubmitButton title="Sign in" onPress={handleSubmit} />
    </View>
  );
};

const SignIn = () => {
  const [signIn] = useSignIn();
  const dispatch = useSetUser();

  const authStorage = useAuthStorage();

  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try{
    const data = await signIn(values);
    const token = await authStorage.getAccessToken();
    if (data.authenticate.accessToken === token) {
      dispatch({ type: "SIGNIN" });
      navigate("/");
    }
    }catch(err){
      Alert.alert("Error", err.message);
    }
  };

  const initialValues = {
    username: "",
    password: "",
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ handleSubmit }) => <SignInForm handleSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignIn;
