import { useEffect, useState } from "react";
import { ColorForm } from "../ColorForm/ColorForm";
import { CopyToClipboard } from "../CopyToClipboard/CopyToClipboard";
import styled from "styled-components";

const StyledColor = styled.div`
  margin: 0px 10px;
  padding: 5px;

  .color-card-hightlight {
    display: inline;
    padding: 2px 6px;
    background: black;
    color: white;
  }
`;

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
          body: JSON.stringify({ colors: [color.hex, color.contrastText] }),
        }
      ).then((response) => response.json());
      setContrastRating(response.overall);
    }

    postFetch();
  }, [color.hex, color.contrastText]);

  function toggleButton(button) {
    button === "edit" && setEditVisible(!editVisible);
    button === "delete" && setDeleteVisible(!deleteVisible);
  }

  function handleEditColor(editedColor) {
    const newColorValues = { id: color.id, ...editedColor };
    onUpdateColor(newColorValues);
    toggleButton("edit");
  }

  return (
    <StyledColor
      style={{
        background: color.hex,
        color: color.contrastText,
      }}
    >
      <h3 className="color-card-hightlight">{color.hex}</h3>
      <CopyToClipboard text={color.hex} />
      <h4>{color.role}</h4>
      <p>contrast: {color.contrastText}</p>
      <p
        style={{
          background:
            (contrastRating === "Nope" && "red") ||
            (contrastRating === "Yup" && "green") ||
            (contrastRating === "Kinda" && "orange"),
          color:
            (contrastRating === "Nope" && "black") ||
            (contrastRating === "Yup" && "white") ||
            (contrastRating === "Kinda" && "black"),
          opacity: 0.8,
        }}
      >
        Overall Contrast Score: {contrastRating}
      </p>
      {!deleteVisible ? (
        <button
          onClick={() => {
            toggleButton("delete");
          }}
        >
          DELETE
        </button>
      ) : (
        <div>
          <p className="color-card-hightlight">Really delete?</p>
          <button
            onClick={() => {
              toggleButton("delete");
            }}
          >
            CANCEL
          </button>
          <button
            onClick={() => {
              toggleButton("delete");
              onDelete(color.id);
            }}
          >
            DELETE
          </button>
        </div>
      )}
      {!editVisible ? (
        <button
          onClick={() => {
            toggleButton("edit");
          }}
        >
          EDIT
        </button>
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
          <button
            onClick={() => {
              toggleButton("edit");
            }}
          >
            CANCEL
          </button>
        </div>
      )}
    </StyledColor>
  );
}
