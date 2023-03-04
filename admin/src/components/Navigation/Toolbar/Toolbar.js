import React from 'react';

import classes from './Toolbar.css';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const toolbar = (props) => (
  <header className={classes.Toolbar}>
    <DrawerToggle clicked={props.drawToggleClicked}/>
    <div></div>
    <div>
      <div className={classes.hapi}>hapi</div>
      <div className={classes.hour}>hour</div>
    </div>
  </header>
);

export default toolbar;