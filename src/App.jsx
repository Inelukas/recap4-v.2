import { initialColors } from "./lib/colors";
import Color from "./Components/Color/Color";
import "./App.css";
import { ColorForm } from "./Components/ColorForm/ColorForm";
import { useState } from "react";
import { uid } from "uid";

function App() {
  const [colors, setColors] = useState([...initialColors]);

  function handleNewColor(newColor) {
    setColors((prevColors) => [{ ...newColor, id: uid() }, ...prevColors]);
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

  return (
    <>
      <h1>Theme Creator</h1>
      <ColorForm onNewColor={handleNewColor} />
      {colors.length > 0 ? (
        colors.map((color) => {
          return (
            <Color
              key={color.id}
              color={color}
              onDelete={handleDeleteColor}
              onUpdateColor={handleUpdateColor}
            />
          );
        })
      ) : (
        <h4>Please add some colors</h4>
      )}
    </>
  );
}

export default App;
