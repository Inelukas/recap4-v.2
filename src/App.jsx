import { initialColors, initialThemes } from "./lib/colors";
import Color from "./Components/Color/Color";
import { ColorForm } from "./Components/ColorForm/ColorForm";
import { uid } from "uid";
import { ThemeForm } from "./Components/ThemeForm/ThemeForm";
import useLocalStorageState from "use-local-storage-state";
import styled from "styled-components";

const StyledFragment = styled.div`
  font-family: "Segoe UI", "Helvetica Neue", Arial, sans-serif;
  padding: 10px;
`;

function App() {
  const [colors, setColors] = useLocalStorageState("colors", {
    defaultValue: [...initialColors],
  });
  const [themes, setThemes] = useLocalStorageState("themes", {
    defaultValue: [...initialThemes],
  });
  const [currentTheme, setCurrentTheme] = useLocalStorageState("currentTheme", {
    defaultValue: "Default Theme",
  });

  function handleNewColor(newColor) {
    const newId = uid();
    setColors((prevColors) => [{ ...newColor, id: newId }, ...prevColors]);
    setThemes((prevThemes) => {
      return prevThemes.map((theme) => {
        return theme.name === currentTheme
          ? { ...theme, colors: [...theme.colors, newId] }
          : theme;
      });
    });
  }

  function handleDeleteColor(id) {
    setColors(
      colors.filter((color) => {
        return color.id !== id;
      })
    );
  }

  function handleUpdateColor(colorData) {
    setColors(
      colors.map((color) => {
        return color.id === colorData.id ? colorData : color;
      })
    );
  }

  function handleThemeChange(updatedName) {
    setCurrentTheme(updatedName);
  }

  function handleNewTheme(themeName) {
    setThemes([...themes, { id: uid(), name: themeName, colors: [] }]);
    handleThemeChange(themeName);
  }

  function handleDeleteTheme() {
    setThemes(
      themes.filter((theme) => {
        return theme.name !== currentTheme;
      })
    );
    handleThemeChange("Default Theme");
  }

  function handleUpdatedThemeName(updatedName) {
    setThemes(
      themes.map((theme) => {
        return theme.name === currentTheme
          ? { ...theme, name: updatedName }
          : theme;
      })
    );
    handleThemeChange(updatedName);
  }

  function extractThemeColors() {
    const currentThemeArray = themes.filter((theme) => {
      return theme.name === currentTheme;
    });
    const themeColorIds = currentThemeArray[0].colors;
    return colors.filter((color) => {
      return themeColorIds.includes(color.id);
    });
  }

  return (
    <StyledFragment>
      <h1>Theme Creator</h1>
      <ThemeForm
        themes={themes}
        currentTheme={currentTheme}
        onThemeChange={handleThemeChange}
        onNewTheme={handleNewTheme}
        onDelete={handleDeleteTheme}
        onUpdatedThemeName={handleUpdatedThemeName}
      />
      <ColorForm onNewColor={handleNewColor} />
      {extractThemeColors().length > 0 ? (
        extractThemeColors().map((mythemeColor) => {
          return (
            <Color
              key={mythemeColor.id}
              color={mythemeColor}
              onDelete={handleDeleteColor}
              onUpdateColor={handleUpdateColor}
            />
          );
        })
      ) : (
        <h4>Please add some colors</h4>
      )}
    </StyledFragment>
  );
}

export default App;
