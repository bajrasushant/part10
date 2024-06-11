import { Button, Menu, PaperProvider } from "react-native-paper";
import { View } from "react-native";
import { useState } from "react";
import theme from "./theme";
import { availableSortingOptions } from "../utils/sortingOptions";

const SortingOption = ({ sortChosen, handleSortOptionChosenChange }) => {
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  return (
    <PaperProvider>
      <View>
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <Button textColor={theme.colors.textPrimary} onPress={openMenu}>
              {sortChosen}
            </Button>
          }
        >
          {availableSortingOptions.map((option, index) => (
            <Menu.Item
              style={{ zIndex: 2 }}
              onPress={() => {
                handleSortOptionChosenChange(option);
                closeMenu();
              }}
              disabled={sortChosen === option}
              key={index}
              title={option}
            />
          ))}
        </Menu>
      </View>
    </PaperProvider>
  );
};

export default SortingOption;
