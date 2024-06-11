// import Constants from "expo-constants";
import { View, StyleSheet } from "react-native";
import AppBar from "./AppBar";
import theme from "./theme";
import { Navigate, Route, Routes } from "react-router-native";
import SignIn from "./SignIn";
import SingleRepositoryItem from "./SingleRepositoryItem";
import AddReview from "./AddReview";
import SignUp from "./SignUp";
import RepositoryList from "./RepositoryList";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.colors.tertiaryBackground,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/create_review" element={<AddReview />} />
        <Route path="/aboutRepo/:repoId" element={<SingleRepositoryItem />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  );
};

export default Main;
