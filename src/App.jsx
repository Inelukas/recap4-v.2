import { initialColors } from "./lib/colors";
import Color from "./Components/Color/Color";
import "./App.css";
import { ColorForm } from "./Components/ColorForm/ColorForm";
import { useState } from "react";

function App() {
  const [colors, setColors] = useState([...initialColors]);

  function handleNewColor(newColor) {
    setColors((prevColors) => [newColor, ...prevColors]);
  }

  function handleDeleteColor(id) {
    setColors(
      colors.filter((color) => {
        return color.id !== id;
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
            <Color key={color.id} color={color} onDelete={handleDeleteColor} />
          );
        })
      ) : (
        <h4>Please add some colors</h4>
      )}
    </>
  );
}

export default App;
