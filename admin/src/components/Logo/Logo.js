import React from 'react';

import classes from './Logo.css';

import hh_logo from '../../assets/images/hh_logo.png';

const logo = (props) => (
  <div className={classes.Logo} style={{height: props.height}}>
    <img src={hh_logo} alt="hapihour_beer"/>
  </div>

);

export default logo;