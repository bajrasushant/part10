import { StyleSheet, ScrollView, View, Pressable } from "react-native";
import Constants from "expo-constants";
import theme from "./theme";
import { Link } from "react-router-native";
import Text from "./Text";
import { useQuery } from "@apollo/client";
import { USER } from "../graphql/queries";
import { useSetUser, useUser } from "../contexts/SignedInUserContext";
import useSignOut from "../hooks/useSignout";
import { useEffect } from "react";

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
  const { loading, error, data } = useQuery(USER);

  const dispatch = useSetUser();

  const user = useUser();

  useEffect(() => {
    if (data && data.me) {
      dispatch({ type: "SIGNIN" });
    }
  }, [data]);

  const signout = useSignOut();

  if (loading) {
    return null;
  }

  if (error) {
    console.error("Error fetching user data:", error);
    return (
      <View style={styles.container}>
        <Text>Error occurred</Text>
      </View>
    );
  }


  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Link to="/">
          <Text style={styles.appBarTab}>Repositories</Text>
        </Link>
        {!user ? (
          <Link to="/signin">
            <Text style={styles.appBarTab}>Sign in</Text>
          </Link>
        ) : (
          <>
            <Link to="/create_review">
              <Text style={styles.appBarTab}>Create a review</Text>
            </Link>
            <Pressable onPress={signout}>
              <Text style={styles.appBarTab}>Sign Out</Text>
            </Pressable>
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
