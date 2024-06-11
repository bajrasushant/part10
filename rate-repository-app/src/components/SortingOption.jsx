import { Button, Menu, PaperProvider } from "react-native-paper";
import { View } from "react-native";
import { useState } from "react";
import useRepositories from "../hooks/useRepositories";
import RepositoryList from "./RepositoryList";
import theme from "./theme";
import { availableSortingOptions, sortParams } from "../utils/sortingOptions";

const SortingOption = () => {
  const [visible, setVisible] = useState(false);

  const [sortChosen, setSortChosen] = useState(availableSortingOptions[0]);

  const currentSortParam = sortParams[sortChosen];
  const { loading, error, repositories } = useRepositories(currentSortParam);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  return (
    <PaperProvider>
      <View>
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          style={{marginTop: "0"}}
          anchor={
            <Button textColor={theme.colors.textPrimary} onPress={openMenu}>
              {sortChosen}
            </Button>
          }
        >
          {availableSortingOptions.map((option, index) => (
            <Menu.Item
              style={{ margin: "0" }}
              onPress={() => {
                setSortChosen(option);
                closeMenu();
              }}
              disabled={sortChosen === option}
              key={index}
              title={option}
            />
          ))}
        </Menu>
        <RepositoryList
          error={error}
          loading={loading}
          repositories={repositories}
        />
      </View>
    </PaperProvider>
  );
};

export default SortingOption;
