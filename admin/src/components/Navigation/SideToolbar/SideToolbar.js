import React from "react";

import classes from "./SideToolbar.css";
import Aux from "../../../hoc/Aux/Aux";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import Line from "../../UI/Line/Line";
import ToolbarUser from "../ToolbarUser/ToolbarUser";
import { Link } from "react-router-dom";

const sideToolbar = (props) => (
  <Aux>
    <div className={classes.SideToolbar}>
      <div className={classes.Logo}>
        <Link to="/">
          <Logo />
        </Link>
      </div>
      <nav>
        <Line />
        <NavigationItems isAdmin={props.isAdmin} />
        <Line />
      </nav>
      {props.userName && <ToolbarUser userName={props.userName.name} />}
    </div>
  </Aux>
);

export default sideToolbar;
