import { Pressable, StyleSheet } from "react-native";
import Text from "./Text";
import theme from "./theme";

const styles = StyleSheet.create({
  appBarTab: {
    padding: 20,
    color: theme.colors.textSecondary,
    fontWeight: theme.fontWeights.bold,
    fontSize: theme.fontSizes.subHeading,
  },
});

const AppBarTab = ({ name }) => {
  return (
    <Pressable onPress={() => console.log("pressed")}>
      <Text style={styles.appBarTab}>{name}</Text>
    </Pressable>
  );
};

export default AppBarTab;
