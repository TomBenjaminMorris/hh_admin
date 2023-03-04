import React from "react";

import classes from "./Button.css";

const button = props => (
  <a
    className={[classes.Button, classes[props.btnType]].join(" ")}
    onClick={props.clicked}
  >
    {props.children}
  </a>
);

export default button;
