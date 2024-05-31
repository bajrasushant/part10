import { Image, StyleSheet, View } from "react-native";
import Text from "./Text";
import theme from "./theme";

const RepositoryItem = (props) => {
  const styles = StyleSheet.create({
    mainContainer: {
      padding: 10,
      gap: 10,
      backgroundColor: theme.colors.secondaryBackground,
    },
    detailsContainer: {
      flexDirection: "row",
      gap: 20,
    },
    repoDetailsContainer: {
      flex: 1,
      gap: 7,
    },
    otherDetailsContainer: {
      flexDirection: "row",
      justifyContent: "space-around",
    },
    numberContainer: {
      alignItems: "center",
    },
    tinyLogo: {
      width: 50,
      height: 50,
      borderRadius: 5,
    },
    languageContainer: {
      backgroundColor: theme.colors.blueBackground,
      borderRadius: 5,
      padding: 4,
    },
    language: {
      color: theme.colors.textSecondary,
    }
  });

  const { repository } = props;

  const {
    ownerAvatarUrl,
    fullName,
    description,
    language, stargazersCount, forksCount,
    reviewCount,
    ratingAverage,
  } = repository;

  const details = [
    { count: stargazersCount, label: "Stars" },
    { count: forksCount, label: "Forks" },
    { count: reviewCount, label: "Reviews" },
    { count: ratingAverage, label: "Rating" },
  ];

  const formatCounts = (count) => {
    if (count < 1000) return count;
    const digit = count / 1000;
    const frontDigit = Math.floor(digit);
    const afterDecimal = Math.round((digit % 1) * 10);
    if (afterDecimal === 0) {
      return frontDigit + "k";
    }
    return `${frontDigit}.${afterDecimal}k`;
  };

  const RepoDetails = () => (
    <View style={styles.repoDetailsContainer}>
      <Text fontWeight="bold">{fullName}</Text>
      <Text color="textTertiary">{description}</Text>
      <View style={{ flexDirection: "row", flexShrink: 1 }}>
        <View style={styles.languageContainer}>
          <Text style={styles.language}>{language}</Text>
        </View>
      </View>
    </View>
  );

  const NumbersDetails = ({ detail }) => (
    <View style={styles.numberContainer}>
      <Text fontWeight="bold">{formatCounts(detail.count)}</Text>
      <Text color="textTertiary">{detail.label}</Text>
    </View>
  );

  return (
    <View style={styles.mainContainer}>
      <View style={styles.detailsContainer}>
        <Image style={styles.tinyLogo} source={{ uri: ownerAvatarUrl }} />
        <RepoDetails />
      </View>
      <View style={styles.otherDetailsContainer}>
        {details.map((detail, index) => (
          <NumbersDetails key={index} detail={detail} />
        ))}
      </View>
    </View>
  );
};

export default RepositoryItem;
