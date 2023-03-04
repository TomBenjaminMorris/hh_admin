import React from "react";
import classes from "./Deal.css";

import edit_icon from '../../../assets/icons/edit.png';
import delete_icon from '../../../assets/icons/trash.png';
import time_icon from '../../../assets/icons/clock.png';
import calendar_icon from '../../../assets/icons/calendar.png';


const deal = (props) => {
  const { endTime, startTime, description, weekDays } = props.deal;
  let abbrevDays = require("abbrev-weekday-range");
  let weekDayFinal = abbrevDays(weekDays);
  weekDayFinal === "Sun-Sat" ? (weekDayFinal = "Everyday") : null;

  return (
    <div className={classes.Deal}>
      <img src={edit_icon} className={classes.Edit} onClick={props.editDeal} alt="edit"/>
      <img src={delete_icon} className={classes.Delete} onClick={props.removeDeal} alt="delete"/>
      <img className={classes.CalendarIcon} src={calendar_icon} alt="calendar"/>
      <div className={classes.Days}>{weekDayFinal}</div>
      <img className={classes.TimeIcon} src={time_icon} alt="time"/>
      <div className={classes.Time}>
        {startTime} - {endTime}
      </div>
      {description.map((data, i) => {
        return <div key={i} className={classes.DealItem}>{`• ${data}`}</div>;
      })}
    </div>
  );
};

export default deal;
