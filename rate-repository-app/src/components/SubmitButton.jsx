import { Pressable, StyleSheet } from "react-native";
import theme from "./theme";
import Text from "./Text";

const styles = StyleSheet.create({
  submitButton: {
    backgroundColor: theme.colors.blueBackground,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
});

const SubmitButton = ({ title, onPress }) => (
  <Pressable onPress={onPress} style={styles.submitButton}>
    <Text fontWeight="bold" color="textSecondary">
      {title}
    </Text>
  </Pressable>
  );

export default SubmitButton;
