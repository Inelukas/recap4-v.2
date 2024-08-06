import { useState } from "react";
import styled from "styled-components";

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

export function ColorForm({
  onNewColor,
  initialValues = { role: "", hex: "#000000", contrast: "#ffffff" },
  ids = { roleId: "role", hexId: "hex", contrastId: "contrast" },
  buttonName = "ADD COLOR",
}) {
  const [inputValues, setInputValues] = useState(initialValues);

  function handleChange(event) {
    const { name, value } = event.target;
    setInputValues((prevValues) => {
      return { ...prevValues, [name]: value };
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    const role = document.getElementById(ids.roleId).value;
    const hex = document.getElementById(ids.hexId).value;
    const contrast = document.getElementById(ids.contrastId).value;
    const newColor = {
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
          id={ids.roleId}
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
            id={ids.hexId}
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
            id={ids.contrastId}
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
      <button type="submit">{buttonName}</button>
    </StyledForm>
  );
}
