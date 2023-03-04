import React from "react";
import classes from "./OpeningTimes.css";
const defaultTemplate = [
  {
    mon: {
      open: "",
      close: "",
    },
    tue: {
      open: "",
      close: "",
    },
    wed: {
      open: "",
      close: "",
    },
    thu: {
      open: "",
      close: "",
    },
    fri: {
      open: "",
      close: "",
    },
    sat: {
      open: "",
      close: "",
    },
    sun: {
      open: "",
      close: "",
    },
  },
];


const openingTimes = (props) => {
  
  let daysAndTimes = props.openingTimes[0];
  daysAndTimes === undefined ? daysAndTimes = defaultTemplate[0] : delete daysAndTimes['_id'];
  
  const daysAndTimesKeys = Object.keys(daysAndTimes);
  
  return (
    <div className={classes.OpeningTimes}>
      {/* <div className={classes.Title}>OPENING TIMES</div> */}
      <div className={classes.DaysAndTimes}>
        {daysAndTimesKeys.map((day) => {
          const openTime = daysAndTimes[day].open === "" ? "00:00" : daysAndTimes[day].open;
          const closeTime = daysAndTimes[day].close === "" ? "00:00" : daysAndTimes[day].close;;
          return (
            daysAndTimes[day] && (
              <div key={day} className={classes.SingleDayAndTime}>
                <div className={classes.Day}>
                  <div>{day.charAt(0).toUpperCase() + day.slice(1)}</div>
                </div>
                {props.editing ? (
                  <input title={day + "-open"} className={classes.Time} type="time" defaultValue={openTime} onChange={(event) => props.changed(event)} />
                ) : (
                  <div className={classes.Time}>{openTime}</div>
                )}
                <div className={classes.Time}>{" - "}</div>
                {props.editing ? (
                  <input title={day + "-close"} className={classes.Time} type="time" defaultValue={closeTime} onChange={(event) => props.changed(event)} />
                ) : (
                  <div className={classes.Time}>{closeTime}</div>
                )}
              </div>
            )
          );
        })}
      </div>
    </div>
  );
};

export default openingTimes;
