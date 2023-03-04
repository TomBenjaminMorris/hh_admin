import React from "react";

import classes from "./NavigationItem.css";
import locationIcon from "../../../../assets/icons/discover.png";
import dealsIcon from "../../../../assets/icons/cocktail.png";
import helpIcon from "../../../../assets/icons/help.png";
import photosIcon from "../../../../assets/icons/image.png";
import logOutIcon from "../../../../assets/icons/logout.png";
import adminIcon from "../../../../assets/icons/admin.png";
import statsIcon from "../../../../assets/icons/stats.png";
import { NavLink } from "react-router-dom";

const navigationItem = (props) => {
  let finalIcon = "";

  switch (props.navType) {
    case "Admin":
      finalIcon = adminIcon;
      break;
    case "Details":
      finalIcon = locationIcon;
      break;
    case "Deals":
      finalIcon = dealsIcon;
      break;
    case "Help":
      finalIcon = helpIcon;
      break;
    case "Photos":
      finalIcon = photosIcon;
      break;
    case "Stats":
      finalIcon = statsIcon;
      break;
    case "LogOut":
      finalIcon = logOutIcon;
      break;
    default:
    // code block
  }

  return (
    <li className={classes.NavigationItem}>
      <div>
        <img src={finalIcon} />
      </div>
      <NavLink
        to={props.link}
        activeStyle={{
          color: "rgb(238, 128, 31)",
        }}
      >
        {props.children}
      </NavLink>
    </li>
  );
};

export default navigationItem;
