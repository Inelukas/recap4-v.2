import { useState } from "react";
import styled from "styled-components";
import { uid } from "uid";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 200px;
  margin-bottom: 10px;

  fieldset {
    border: none;
    display: flex;
    flex-direction: column;
  }

  .input-group {
    display: flex;
  }

  button {
    font-size: 14px;
    margin-left: 12px;
    align-self: flex-start;
  }
`;

export function ColorForm({ onNewColor }) {
  const [inputValues, setInputValues] = useState({
    role: "",
    hex: "#000000",
    contrast: "#ffffff",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setInputValues((prevValues) => {
      return { ...prevValues, [name]: value };
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    const role = document.getElementById("role").value;
    const hex = document.getElementById("hex").value;
    const contrast = document.getElementById("contrast").value;
    const newColor = {
      id: uid(),
      role: role,
      hex: hex,
      contrastText: contrast,
    };
    onNewColor(newColor);
    setInputValues({
      role: "",
      hex: "#000000",
      contrast: "#ffffff",
    });
    event.target.role.focus();
  }

  return (
    <StyledForm onSubmit={handleSubmit}>
      <fieldset>
        <label htmlFor="role">Role</label>
        <input
          onChange={handleChange}
          type="text"
          name="role"
          id="role"
          value={inputValues.role}
        />
      </fieldset>
      <fieldset>
        <label htmlFor="hex">Hex</label>
        <div className="input-group">
          <input
            onChange={handleChange}
            type="text"
            name="hex"
            id="hex"
            value={inputValues.hex}
          />
          <input
            onChange={handleChange}
            type="color"
            name="hex"
            value={inputValues.hex}
          />
        </div>
      </fieldset>
      <fieldset>
        <label htmlFor="contrast">Contrast</label>
        <div className="input-group">
          <input
            onChange={handleChange}
            type="text"
            name="contrast"
            id="contrast"
            value={inputValues.contrast}
          />
          <input
            onChange={handleChange}
            type="color"
            name="contrast"
            value={inputValues.contrast}
          />
        </div>
      </fieldset>
      <button type="submit">ADD COLOR</button>
    </StyledForm>
  );
}
