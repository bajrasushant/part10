import { Alert, Pressable, StyleSheet, View } from "react-native";
import theme from "./theme";
import Text from "./Text";
import { formatDate } from "../utils/helpers";

const ReviewItem = ({ review, personal = false, navigate, deleteReview }) => {
  const deleteAlert = () =>
    Alert.alert(
      "Delete review",
      "Are you sure you want to delete the review?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        { text: "Delete", onPress: () => deleteReview(review.id) },
      ],
    );

  return (
    <View style={styles.mainMainContainer}>
      <View style={styles.mainContainer}>
        <View style={styles.ratingTextContainer}>
          <Text style={styles.ratingText}>{review.rating}</Text>
        </View>
        <View style={styles.secondaryContainer}>
          {personal === true ? (
            <Text fontWeight="bold">{review.repository.fullName}</Text>
          ) : (
            <Text fontWeight="bold">{review.user.username}</Text>
          )}
          <Text color="textTertiary">{formatDate(review.createdAt)}</Text>
          <Text style={styles.textualReview}>{review.text}</Text>
        </View>
      </View>
      {personal === true ? (
        <View style={styles.buttonContainer}>
          <Pressable
            style={[styles.button, styles.normal]}
            onPress={() => {
              navigate(`/aboutRepo/${review.repository.id}`);
            }}
          >
            <Text color="textSecondary" fontWeight="bold">
              View repository
            </Text>
          </Pressable>
          <Pressable
            style={[styles.button, styles.danger]}
            onPress={() => {
              deleteAlert();
            }}
          >
            <Text color="textSecondary" fontWeight="bold">
              Delete review
            </Text>
          </Pressable>
        </View>
      ) : (
        <></>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainMainContainer: {
    backgroundColor: theme.colors.secondaryBackground,
    alignItems: "center",
  },
  mainContainer: {
    flexDirection: "row",
    gap: 10,
    paddingTop: 5,
  },
  ratingTextContainer: {
    width: 40,
    height: 40,
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: theme.colors.blueBorder,
    borderRadius: 20,
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  ratingText: {
    color: theme.colors.blueBorder,
    fontWeight: "bold",
  },
  secondaryContainer: {
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 5,
    flex: 1,
  },
  textualReview: {
    marginTop: 2,
  },
  buttonContainer: {
    flexDirection: "row",
  },
  button: {
    paddingLeft: 40,
    paddingRight: 40,
    paddingTop: 20,
    paddingBottom: 20,
    borderRadius: 5,
  },
  normal: {
    backgroundColor: theme.colors.blueBackground,
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 10,
    marginRight: 10,
  },
  danger: {
    backgroundColor: theme.colors.errorColor,
    marginRight: 10,
    marginTop: 10,
    marginBottom: 10,
  },
});
export default ReviewItem;
