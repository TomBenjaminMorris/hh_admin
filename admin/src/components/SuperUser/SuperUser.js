import React, { Component } from "react";
import GoogleSearch from "../GoogleSearch/GoogleSearch";

import classes from "./SuperUser.css";
// import Button from "../UI/Button/Button";
import axios_bars from "../../axios-bars";

class SuperUser extends Component {
  state = {
    locationID: null,
    searchName: "",
    searchResult: null,
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ searchName: event.target.value });
    axios_bars
      .get("/find", { params: { name: event.target.value } })
      .then((response) => {
        this.setState({ searchResult: response.data });
      })
      .catch((error) => {
        console.log("Index error: " + error);
      });
  };

  handleClickLocation = (location) => {
    this.props.locationIdUpdate(location.place_id);
    this.setState({ searchResult: null, searchName: location.name });
  };

  handleDeleteBar = (e, location) => {
    // Don't propogate the event to the document
    if (e.stopPropagation) {
      e.stopPropagation(); // W3C model
    } else {
      e.cancelBubble = true; // IE model
    }

    const answer = window.confirm("Are you sure you want to delete this bar?");
    if (!answer) {
      return;
    }

    axios_bars
      .delete("/bar?place_id=" + location.place_id)
      .then(function (response) {
        window.alert("Bar Deleted");
      })
      .catch(function (error) {
        window.alert("There was an error deleting the bar");
      });

    this.setState({ searchName: "", searchResult: null });
  };

  render() {
    const results = (
      <div className={classes.ResultWrapper}>
        {this.state.searchResult &&
          this.state.searchResult.map((location, i) => {
            return (
              <div
                key={i}
                className={classes.Result}
                onClick={() => this.handleClickLocation(location)}
              >
                {location.name}
                <div
                  className={classes.deleteBar}
                  onClick={(e) => this.handleDeleteBar(e, location)}
                >
                  x
                </div>
              </div>
            );
          })}
      </div>
    );
    return (
      <div className={classes.SuperUser}>
        <h1>Add New Location</h1>
        <GoogleSearch />
        <h1>Switch Location</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.searchName}
            onChange={this.handleSubmit}
          />
          {results}
          <div className={classes.AddDealButton}>
            {/* <Button btnType={"Add"} clicked={this.handleSubmit}>
              Search
            </Button> */}
          </div>
        </form>
        {/* id<input type="text" onChange={(e) => this.setState({locationID: e.target.value})}/> */}
      </div>
    );
  }
}

export default SuperUser;
