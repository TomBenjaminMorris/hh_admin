import React from 'react';

import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navItemsAdmin = ['Admin', 'Details', 'Deals', 'Photos', 'Stats', 'Help', 'LogOut'];
const navItemsPleb = ['Details', 'Deals', 'Photos', 'Stats', 'Help', 'LogOut'];

const navigationItems = (props) => {
  const navItems = props.isAdmin ? navItemsAdmin : navItemsPleb;
  return (<ul className={classes.NavigationItems}>
    {navItems.map( (item, i) => {
      return <NavigationItem key={item + i} link={item.toLowerCase()} navType={item}>{item === 'LogOut' ? 'Log Out' : item}</NavigationItem>
    })}
  </ul>)
};

export default navigationItems;