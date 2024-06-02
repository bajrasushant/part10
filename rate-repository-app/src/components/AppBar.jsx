import { StyleSheet, ScrollView, View } from "react-native";
import Constants from "expo-constants";
import theme from "./theme";
import { Link } from "react-router-native";
import Text from "./Text";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.primaryBackground,
    flexDirection: "row",
  },
  appbar: {
    padding: 20,
  },
  appBarTab: {
    padding: 20,
    color: theme.colors.textSecondary,
    fontWeight: theme.fontWeights.bold,
    fontSize: theme.fontSizes.subHeading,
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Link to="/">
          <Text style={styles.appBarTab}>Repositories</Text>
        </Link>
        <Link to="/signin">
          <Text style={styles.appBarTab}>Sign in</Text>
        </Link>
      </ScrollView>
    </View>
  );
};

export default AppBar;
