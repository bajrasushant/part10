import { StyleSheet, View } from "react-native";
import theme from "./theme";
import * as yup from "yup";
import FormikTextInput from "./FormikTextInput";
import SubmitButton from "./SubmitButton";
import { Formik } from "formik";
import useSignIn from "../hooks/useSignin";
import useSignUp from "../hooks/useSignup";
import useAuthStorage from "../hooks/useAuthStorage";
import { useNavigate } from "react-router-native";
import { useSetUser } from "../contexts/SignedInUserContext";

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.secondaryBackground,
    padding: 20,
  },
});

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(5, "Minimum 5 characters needed for username.")
    .max(30, "Maximum charaters 30 only for username.")
    .required("Username is required"),
  password: yup
    .string()
    .min(5, "Minimum 5 characters needed for password.")
    .max(50, "Maximum charaters 50 only for password..")
    .required("Password is required"),
  repassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Password don't match")
    .required("Password confirm is required."),
});

export const SignUpForm = ({ handleSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput name="username" placeholder="Username" />
      <FormikTextInput name="password" placeholder="Password" secureTextEntry />
      <FormikTextInput
        name="repassword"
        placeholder="Password confirmation"
        secureTextEntry
      />
      <SubmitButton title="Sign up" onPress={handleSubmit} />
    </View>
  );
};

const SignUp = () => {
  const [signIn] = useSignIn();
  const [signUp] = useSignUp();

  const dispatch = useSetUser();

  const authStorage = useAuthStorage();

  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    const { username, password } = values;
    await signUp({ username, password });

    // after signup directly signin
    const data = await signIn({ username, password });
    const token = await authStorage.getAccessToken();
    if (data.authenticate.accessToken === token) {
      dispatch({ type: "SIGNIN" });
      navigate("/");
    }
  };

  const initialValues = {
    username: "",
    password: "",
    repassword: "",
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ handleSubmit }) => <SignUpForm handleSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignUp;
