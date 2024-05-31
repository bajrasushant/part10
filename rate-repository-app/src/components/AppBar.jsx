import { StyleSheet, View } from "react-native";
import Constants from "expo-constants";
import theme from "./theme";
import AppBarTab from "./AppBarTab";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.primaryBackground,
  },
  appbar: {
    padding: 20,
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <AppBarTab name="Repositories" />
    </View>
  );
};

export default AppBar;
