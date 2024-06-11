import { StyleSheet, View } from "react-native";
import theme from "./theme";
import Text from "./Text";
import { formatDate } from "../utils/helpers";

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "row",
    gap: 10,
    backgroundColor: theme.colors.secondaryBackground,
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
});

const ReviewItem = ({ review }) => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.ratingTextContainer}>
        <Text style={styles.ratingText}>{review.rating}</Text>
      </View>
      <View style={styles.secondaryContainer}>
        <Text fontWeight="bold">{review.user.username}</Text>
        <Text color="textTertiary">{formatDate(review.createdAt)}</Text>
        <Text style={styles.textualReview}>{review.text}</Text>
      </View>
    </View>
  );
};
export default ReviewItem;
