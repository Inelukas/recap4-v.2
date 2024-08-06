import { useState } from "react";
import "./Color.css";

export default function Color({ color, onDelete }) {
  const [deleteVisible, setDeleteVisible] = useState(false);

  function toggleDelete() {
    setDeleteVisible(!deleteVisible);
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
    </div>
  );
}
