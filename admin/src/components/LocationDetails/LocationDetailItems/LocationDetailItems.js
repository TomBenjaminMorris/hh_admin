import React from "react";

import classes from "./LocationDetailItems.css";
import LocationDetailItem from "./LocationDetailItem/LocationDetailItem";

const locationDetailItems = (props) => {
  const locationTemplate = {
    name: {
      name: "Name",
      type: "text",
    },
    address: {
      name: "Address",
      type: "text",
    },
    openingTimes: {
      name: "Opening Times",
      type: "times",
    },
    website: {
      name: "Website",
      type: "link",
    },
    facebook: {
      name: "Facebook",
      type: "link",
    },
    instagram: {
      name: "Instagram",
      type: "link",
    },
    twitter: {
      name: "Twitter",
      type: "link",
    },
    validated: {
      name: "Displayed",
      type: "checkbox",
    },
  };

  const socialKeys = ['facebook', 'instagram', 'twitter'];

  let locationItems = [];
  const templateKeys = Object.keys(locationTemplate);

  if (props.locationDetails) {
    locationItems = templateKeys.map((key) => {
      return (
        <LocationDetailItem
          key={key}
          title={locationTemplate[key].name}
          content={socialKeys.includes(key) && props.locationDetails.social ? props.locationDetails.social[key] : props.locationDetails[key]}
          openingTimes={props.locationDetails.openingTimes}
          editing={props.editing}
          changed={props.updateField}
          type={locationTemplate[key].type}
          validated={props.validated}
          checkboxToggle={props.checkboxToggle}
        />
      );
    });
  }

  return <div className={classes.LocationDetailItems}>{locationItems}</div>;
};

export default locationDetailItems;
