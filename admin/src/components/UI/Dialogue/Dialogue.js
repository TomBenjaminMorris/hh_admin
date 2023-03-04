import React from "react";

import classes from "./Dialogue.css";
import Button from '../Button/Button';

const dialogue = (props) => (
  <div className={classes.Dialogue}>
    <header>
      <h2>{props.title}</h2>
    </header>
    <article>
      <p>
        {props.children}
      </p>
    </article>
    <footer>
      <Button btnType={"Success"} clicked={props.confirm}>
        Save
      </Button>
      <Button btnType={"Danger"} clicked={props.cancel}>
        Cancel
      </Button>
    </footer>
  </div>
);

export default dialogue;