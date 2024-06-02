import { useFormik } from "formik";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import Text from "./Text";
import theme from "./theme";
import * as yup from "yup";

const SignIn = () => {
  const validationSchema = yup.object().shape({
    username: yup.string().required("Username is required"),
    password: yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      resetForm();
    },
  });

  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.colors.secondaryBackground,
      padding: 20,
      gap: 20,
    },
    inputTexts: {
      height: 60,
      borderWidth: 1,
      padding: 10,
      borderColor: theme.colors.tertiaryBackground,
      borderRadius: 5,
      fontSize: theme.fontSizes.body,
    },
    textInvalid: {
      borderColor: theme.colors.errorColor,
    },
    submitButton: {
      backgroundColor: theme.colors.blueBackground,
      padding: 15,
      borderRadius: 10,
      alignItems: "center",
    },
  });
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange("username")}
        style={[styles.inputTexts, formik.touched.username && formik.errors.username && styles.textInvalid]}
      />
      {formik.touched.username && formik.errors.username && (
        <Text style={{ color: 'red', fontStyle: 'italic' }}>{formik.errors.username}</Text>
      )}
      <TextInput
        placeholder="Password"
        value={formik.values.password}
        onChangeText={formik.handleChange("password")}
        secureTextEntry
        style={[styles.inputTexts, formik.touched.password && formik.errors.password && styles.textInvalid]}
      />
      {formik.touched.username && formik.touched.password && formik.errors.password && (
        <Text style={{ color: 'red', fontStyle: 'italic' }}>{formik.errors.password}</Text>
      )}
      <Pressable onPress={formik.handleSubmit} style={styles.submitButton}>
        <Text fontWeight="bold" color="textSecondary">
          Sign in
        </Text>
      </Pressable>
    </View>
  );
};

export default SignIn;