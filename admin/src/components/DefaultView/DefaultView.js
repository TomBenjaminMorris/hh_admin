import React from "react";
import classes from "./DefaultView.css";
import { Link } from "react-router-dom";
import location_icon from "../../assets/icons/discover.png";
import deals_icon from "../../assets/icons/cocktail.png";
import help_icon from "../../assets/icons/help.png";
import website_icon from "../../assets/icons/website.png";

const defaultView = (props) => {
  return (
    <div className={classes.DefaultView}>
      <div className={classes.HeaderImage}>
      </div>

      <div className={classes.ButtonLinks}>
        <h2>Welcome, <br/> {props.locationName}</h2>
        <h3>Get started by visiting the following pages:</h3>

        <Link to="/details">
          <button className={classes.Button}>
            <img src={location_icon} alt="location"/>
            View/Edit Your Locations Details
          </button>
        </Link>

        <Link to="/deals">
          <button className={classes.Button}>
            <img src={deals_icon} alt="deals"/>
            View/Edit Your Happy Hour Deals
          </button>
        </Link>

        <Link to="/help">
          <button className={classes.Button}>
            <img src={help_icon} alt="help"/>
            Need Help Getting Started?
          </button>
        </Link>

        <a href={"https://hapihour.io/details/" + props.place_id}>
          <button className={classes.Button}>
            <img src={website_icon} alt="website"/>
            Visit Your Hapihour Web Page
          </button>
        </a>
      </div>
    </div>
  );
};

export default defaultView;
