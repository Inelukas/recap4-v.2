import { useEffect, useState } from "react";
import "./Color.css";
import { ColorForm } from "../ColorForm/ColorForm";
import { CopyToClipboard } from "../CopyToClipboard/CopyToClipboard";

export default function Color({ color, onDelete, onUpdateColor }) {
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const [contrastRating, setContrastRating] = useState("");

  useEffect(() => {
    async function postFetch() {
      const response = await fetch(
        "https://www.aremycolorsaccessible.com/api/are-they",
        {
          method: "POST",
          body: JSON.stringify({ colors: [color.hex, color.contrast] }),
        }
      ).then((response) => response.json());
      setContrastRating(response.overall);
    }

    postFetch();
  }, [color.hex, color.contrast]);

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
      <CopyToClipboard text={color.hex} />
      <h4>{color.role}</h4>
      <p>contrast: {color.contrastText}</p>
      <p>Overall Contrast Score: {contrastRating}</p>
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
