import React from 'react';

import classes from './Line.css';

const line = (props) => {

  let lineClasses = [classes.Line];
  props.classOverride === "MainBody" ? lineClasses.push(classes.MainBody) : null;

  return (
    <div className={lineClasses.join(' ')}>
      <div style={props.style}></div>
    </div>
  );
}

export default line;