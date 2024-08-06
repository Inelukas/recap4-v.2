import { useState } from "react";
import "./Color.css";
import { ColorForm } from "../ColorForm/ColorForm";

export default function Color({ color, onDelete, onUpdateColor }) {
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);

  function toggleDelete() {
    setDeleteVisible(!deleteVisible);
  }

  function toggleEdit() {
    setEditVisible(!editVisible);
  }

  function handleEditColor(editedColor) {
    const newColorValues = { id: color.id, ...editedColor };
    onUpdateColor(newColorValues);
    toggleEdit();
  }

  return (
    <div
      className="color-card"
      style={{
        background: color.hex,
        color: color.contrastText,
      }}
    >
      <h3 className="color-card-hightlight">{color.hex}</h3>
      <h4>{color.role}</h4>
      <p>contrast: {color.contrastText}</p>
      {!deleteVisible ? (
        <button onClick={toggleDelete}>DELETE</button>
      ) : (
        <div>
          <p className="color-card-hightlight">Really delete?</p>
          <button onClick={toggleDelete}>CANCEL</button>
          <button
            onClick={() => {
              toggleDelete();
              onDelete(color.id);
            }}
          >
            DELETE
          </button>
        </div>
      )}
      {!editVisible ? (
        <button onClick={toggleEdit}>EDIT</button>
      ) : (
        <div>
          <ColorForm
            initialValues={{
              role: color.role,
              hex: color.hex,
              contrast: color.contrastText,
            }}
            ids={{
              roleId: "roleColor",
              hexId: "hexColor",
              contrastId: "contrastColor",
            }}
            onNewColor={handleEditColor}
            buttonName="UPDATE COLOR"
          />
          <button onClick={toggleEdit}>CANCEL</button>
        </div>
      )}
    </div>
  );
}
