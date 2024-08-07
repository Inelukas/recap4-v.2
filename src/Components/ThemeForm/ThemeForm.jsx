import { useState } from "react";

export function ThemeForm({
  themes,
  currentTheme,
  onThemeChange,
  onNewTheme,
  onDelete,
  onUpdatedThemeName,
}) {
  const [addTheme, setAddTheme] = useState(false);
  const [editTheme, setEditTheme] = useState(false);
  const [deleteTheme, setDeleteTheme] = useState(false);

  function toggleButton(button) {
    button === "add" && setAddTheme(!addTheme);
    button === "edit" && setEditTheme(!editTheme);
    button === "delete" && setDeleteTheme(!deleteTheme);
  }

  function updateThemeName(event) {
    const updatedName = event.target.value;
    onThemeChange(updatedName);
  }

  function createTheme(event) {
    event.preventDefault();
    const newThemeName = event.target.themeName.value;
    onNewTheme(newThemeName);
    toggleButton("add");
  }

  function handleNewThemeName(event) {
    event.preventDefault();
    const updatedThemeName = event.target.themeName.value;
    onUpdatedThemeName(updatedThemeName);
    toggleButton("edit");
  }

  return (
    <div>
      {addTheme && (
        <form onSubmit={createTheme}>
          <input name="themeName" required />
          <button type="submit">CREATE THEME</button>
          <button
            onClick={() => {
              toggleButton("add");
            }}
            type="button"
          >
            CANCEL
          </button>
        </form>
      )}

      {editTheme && (
        <form onSubmit={handleNewThemeName}>
          <label htmlFor="themeName">Theme Name:</label>
          <div>
            <input name="themeName" required />
            <button type="submit">UPDATE</button>
            <button
              onClick={() => {
                toggleButton("edit");
              }}
              type="button"
            >
              CANCEL
            </button>
          </div>
        </form>
      )}

      {deleteTheme && (
        <div>
          <button
            onClick={() => {
              toggleButton("delete");
              onDelete();
            }}
            type="button"
          >
            YES DELETE
          </button>
          <button
            onClick={() => {
              toggleButton("delete");
            }}
            type="button"
          >
            CANCEL
          </button>
        </div>
      )}

      {!addTheme && !editTheme && !deleteTheme && (
        <div>
          <select defaultValue={currentTheme} onChange={updateThemeName}>
            {themes.map((theme, index) => {
              return <option key={index}>{theme.name}</option>;
            })}
          </select>
          <button
            onClick={() => {
              toggleButton("add");
            }}
          >
            ADD
          </button>
          <button
            onClick={() => {
              toggleButton("edit");
            }}
            disabled={currentTheme === "Default Theme" ? true : false}
          >
            EDIT
          </button>
          <button
            onClick={() => {
              toggleButton("delete");
            }}
            disabled={currentTheme === "Default Theme" ? true : false}
          >
            DELETE
          </button>
        </div>
      )}
    </div>
  );
}
