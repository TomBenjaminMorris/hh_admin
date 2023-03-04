import React, { Component } from "react";
import WeekDayCheckBox from "./WeekDayCheckBox";

import classes from './WeekDays.css';

class WeekDays extends Component {
  constructor(props) {
    super(props);
    const weekDays = this.parseWeekDays(this.props.weekDays);
    this.state = {
      weekDays: weekDays,
    };
  }

  parseWeekDays(weekDays) {

    let dayArray = [
      { id: 1, value: "Mo", isChecked: false },
      { id: 2, value: "Tu", isChecked: false },
      { id: 3, value: "We", isChecked: false },
      { id: 4, value: "Th", isChecked: false },
      { id: 5, value: "Fr", isChecked: false },
      { id: 6, value: "Sa", isChecked: false },
      { id: 0, value: "Su", isChecked: false },
    ];

    dayArray = dayArray.map(day => {
      weekDays.includes(day.id) ? day.isChecked = true : null;
      return day;
    })

    return dayArray;
  }

  handleAllChecked = (event) => {
    let weekDays = [...this.state.weekDays];
    weekDays.forEach((day) => (day.isChecked = event.target.checked));
    this.setState({ weekDays: weekDays });
  };

  handleCheckChildElement = (event) => {
    let weekDays = [...this.state.weekDays];
    weekDays.forEach((day) => {
      if (day.value === event.target.value)
        day.isChecked = event.target.checked;
    });
    this.props.updated(weekDays);
    this.setState({ weekDays: weekDays });
  };

  render() {
    return (
      <div className={classes.WeekDays}>
        {/* <input
          type="checkbox"
          onClick={this.handleAllChecked}
          value="checkedall"
        />{" "}
        All */}
          {this.state.weekDays.map((day, i) => {
            return (
              <WeekDayCheckBox
                key={i}
                handleCheckChildElement={this.handleCheckChildElement}
                {...day}
              />
            );
          })}
      </div>
    );
  }
}

export default WeekDays;
