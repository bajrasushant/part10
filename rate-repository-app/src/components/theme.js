import { Platform } from "react-native";

const theme = {
  colors: {
    textPrimary: "#212121",
    textSecondary: "#FAFAFA",
    textTertiary: "#757575",
    primary: "#0366d6",
    primaryBackground: "#212121",
    secondaryBackground: "#FAFAFA",
    tertiaryBackground: "#E0E0E0",
    blueBackground: "#0277BD",
    errorColor: "#d73a4a",
    blueBorder: "#039BE5"
  },
  fontSizes: {
    body: 15,
    subHeading: 17,
  },
  fonts: {
    main: Platform.select({
      android: "Roboto",
      ios: "Arial",
      default: "System",
    }),
  },
  fontWeights: {
    normal: "400",
    bold: "700",
  },
};

export default theme;
