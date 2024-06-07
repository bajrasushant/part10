import { TextInput, StyleSheet, View } from "react-native";
import theme from "./theme";
import { useField } from "formik";
import Text from "./Text";

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 20,
  },
  inputText: {
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
  errorText: {
    color: theme.colors.errorColor,
    fontStyle: "italic",
  },
});

const FormikTextInput = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name);
  const showError = meta.touched && meta.error;

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={[styles.inputText, showError && styles.textInvalid]}
        {...props}
        onChangeText={(value) => helpers.setValue(value)}
        value={field.value}
      />
      {showError && <Text style={styles.errorText}>{meta.error}</Text>}

    </View>
  );
};

export default FormikTextInput;
