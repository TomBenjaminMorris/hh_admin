import React from "react";

import classes from "./LocationDetailItem.css";
import Checkbox from "../../../UI/Checkbox/Checkbox";
import OpeningTimes from "../OpeningTimes/OpeningTimes";

const locationDetailItem = (props) => {
  let editingField,
    viewingField = null;

  switch (props.type) {
    case "text":
      editingField = (
        <input
          title={props.title}
          type="text"
          defaultValue={props.content}
          onChange={(event) => props.changed(event)}
        />
      );

      viewingField = <h2>{props.content}</h2>;

      break;
    case "link":
      editingField = (
        <input
          title={props.title}
          type="text"
          defaultValue={props.content}
          onChange={(event) => props.changed(event)}
        />
      );

      viewingField = (
        <h2>
          <a href={props.content}>{props.content ? props.content : "N/A"}</a>
        </h2>
      );

      break;
    case "checkbox":
      editingField = (
        <Checkbox
          editing={props.editing}
          validated={props.validated}
          checkboxToggle={props.checkboxToggle}
        />
      );

      viewingField = editingField;
      break;
    case "times":
      editingField = (
        <OpeningTimes editing={props.editing} openingTimes={props.openingTimes} changed={(event) => props.changed(event)}/>
      );
      viewingField = editingField;
      break;
    default:
      break;
  }

  return (
    <div className={classes.LocationDetailItem}>
      <div className={classes.Pill}>{props.title}</div>
      <br />
      {props.editing ? editingField : viewingField}
    </div>
  );
};

export default locationDetailItem;
