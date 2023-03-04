import React, { Component } from "react";

import classes from "./EditingDeal.css";
import Button from "../../UI/Button/Button";
import WeekDays from "../Deal/WeekDays/WeekDays";

class EditingDeal extends Component {
  constructor(props) {
    super(props);
    const newDeal = this.props.newDeal;
    this.state = {
      weekDays: newDeal ? [] : this.props.deal.weekDays,
      description: newDeal ? [""] : this.props.deal.description,
      endTime: newDeal ? "00:00" : this.props.deal.endTime,
      startTime: newDeal ? "00:00" : this.props.deal.startTime,
    };
  }

  handleAddDeal = () => {
    const description = [...this.state.description];
    description.push("");
    this.setState({ description: description });
  };

  handleChangeText = (e) => {
    const value = e.target.value;
    const key = e.target.id;
    const description = [...this.state.description];
    description[key] = value;
    this.setState({ description: description });
  };

  handleRemoveDealItem = (e) => {
    const index = e.target.id;
    let description = [...this.state.description];
    description.splice(index, 1);
    this.setState({ description: description });
  };

  returnDeal = () => {
    let tmpDeal = { ...this.props.deal };
    tmpDeal.startTime = this.state.startTime;
    tmpDeal.endTime = this.state.endTime;
    tmpDeal.description = this.state.description;
    tmpDeal.weekDays = this.state.weekDays;
    this.props.confirm(tmpDeal);
  };

  handleWeekdayChange = (weekDaysArray) => {
    const tmpWeekDayArray = [];
    weekDaysArray.map((day) => {
      return day.isChecked ? tmpWeekDayArray.push(day.id) : null;
    });
    this.setState({ weekDays: tmpWeekDayArray.sort() });
  };

  handleStartTimeChange = (e) => {
    const value = e.target.value;
    let startTime = [...this.state.startTime];
    startTime = value;
    this.setState({ startTime: startTime });
  };

  handleEndTimeChange = (e) => {
    const value = e.target.value;
    let endTime = [...this.state.endTime];
    endTime = value;
    this.setState({ endTime: endTime });
  };

  //handle start and end time change

  render() {
    const { startTime, endTime, description, weekDays } = this.state;
    return (
      <div className={classes.EditingDeal}>
        <header>
          <h2>{this.props.title}</h2>
        </header>

        <WeekDays weekDays={weekDays} updated={this.handleWeekdayChange} />

        <div className={classes.Times}>
          <input
            type="time"
            defaultValue={startTime}
            onChange={this.handleStartTimeChange}
          />
          -
          <input
            type="time"
            defaultValue={endTime}
            onChange={this.handleEndTimeChange}
          />
          <br />
        </div>

        <h3>Details</h3>
        {description &&
          description.map((item, i) => {
            return (
              <div key={i} className={classes.Deals}>
                <input
                  id={i}
                  type="text"
                  value={item}
                  onChange={this.handleChangeText}
                />
                <a
                  className={classes.Close}
                  id={i}
                  onClick={this.handleRemoveDealItem}
                ></a>
                <br />
              </div>
            );
          })}
        <button className={classes.AddDeal} onClick={this.handleAddDeal}>
          +
        </button>
        {/* {JSON.stringify(this.props.deal)} */}

        {this.props.errorMessage && <div className={classes.ErrorMessage}>{this.props.errorMessage}</div>}

        <footer>
          <Button btnType={"Success"} clicked={this.returnDeal}>
            Save
          </Button>
          <Button btnType={"Danger"} clicked={this.props.cancel}>
            Cancel
          </Button>
        </footer>
      </div>
    );
  }
}

export default EditingDeal;
