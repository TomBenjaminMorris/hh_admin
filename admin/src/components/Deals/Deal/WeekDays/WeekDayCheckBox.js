import React from "react";

export const weekDayCheckBox = (props) => {
  return (
    <div>
      <input
        key={props.id}
        onClick={props.handleCheckChildElement}
        type="checkbox"
        checked={props.isChecked}
        onChange={() => (null)}
        value={props.value}
      /><br/>
      {props.value}
    </div>
  );
};

export default weekDayCheckBox;
