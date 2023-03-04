import React from "react";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import classes from "./SideDrawer.css";
import Backdrop from "../../UI/Backdrop/Backdrop";
import Aux from "../../../hoc/Aux/Aux";
import Line from "../../UI/Line/Line";
import { Link } from "react-router-dom";

const sideDrawer = (props) => {
  let attachedClasses = [classes.SideDrawer, classes.Closed];
  if (props.open) {
    attachedClasses = [classes.SideDrawer, classes.Open];
  }
  return (
    <Aux>
      <Backdrop show={props.open} clicked={props.closed} />
      <div className={attachedClasses.join(" ")} onClick={props.closed}>
        <div className={classes.Logo}>
          <Link to="/">
            <Logo />
          </Link>
        </div>
        <nav>
          <Line />
          <NavigationItems />
          <Line />
        </nav>
      </div>
    </Aux>
  );
};

export default sideDrawer;
