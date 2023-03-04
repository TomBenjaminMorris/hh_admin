import React from "react";

import classes from "./Checkbox.css";

const checkbox = (props) => (
  <label className={classes.ValidatedContainer}>
    <input
      type="checkbox"
      name="isValidated"
      disabled={!props.editing}
      style={{ cursor: props.editing ? "pointer" : "not-allowed" }}
      checked={props.validated}
      onChange={props.checkboxToggle}
    />
    <span
      className={classes.Checkmark}
      style={{ cursor: props.editing ? "pointer" : "not-allowed" }}
    ></span>
  </label>
);

export default checkbox;
