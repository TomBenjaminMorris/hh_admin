import React, { Component } from "react";

import classes from "./Deals.css";
import Line from "../UI/Line/Line";
import Deal from "./Deal/Deal";
import Modal from "../UI/Modal/Modal";
import EditingDeal from "./EditingDeal/EditingDeal";
import Spinner from "../UI/Spinner/Spinner";
import Button from "../UI/Button/Button";

class Deals extends Component {
  constructor(props) {
    super(props);

    this.state = {
      locationDetails: this.props.locationDetails,
      editingDeal: null,
      dealIndex: null,
      newDeal: false,
      errorMessage: "",
    };
  }

  componentDidMount() {
    this.props.savingCancelled();
  }

  componentDidUpdate(prevProps) {
    prevProps !== this.props
      ? this.setState({ locationDetails: this.props.locationDetails })
      : null;
  }

  handleEditDeal = (index) => {
    const deal = { ...this.state.locationDetails }.deals[index];
    this.setState({ editingDeal: deal, dealIndex: index, newDeal: false, errorMessage: '' });
    this.props.edit();
  };

  handleRemoveDeal = (index) => {
    const result = window.confirm("Are you sure you want to delete?");
    if (result) {
      const tmpLocationDeals = { ...this.state.locationDetails };
      tmpLocationDeals.deals.splice(index, 1);
      this.setState({ locationDetails: tmpLocationDeals, errorMessage: '' });
      this.props.save(tmpLocationDeals);
    }
  };

  handleSaveDeal = (deal) => {
    
    // Validation checks
    if ( deal.startTime > deal.endTime || deal.startTime === deal.endTime ) {
      this.setState({errorMessage: "Start time must be earlier than end time"});
    }
    else if ( !deal.startTime || !deal.endTime || deal.description.length === 0 || deal.weekDays.length === 0 || deal.description[0] ==='') {
      this.setState({ errorMessage: "You must populate all fields" });
    }
    else {

      const date = new Date()
      const dateTimeFormat = new Intl.DateTimeFormat('en', { year: 'numeric', month: 'long', day: '2-digit' }) 
      const [{ value: month },,{ value: day },,{ value: year }] = dateTimeFormat .formatToParts(date ) 
      const lastUpdated = `${day} ${month} ${year}`;

      const finalLocation = { ...this.state.locationDetails, lastUpdated  };
      this.state.newDeal
      ? finalLocation.deals.push(deal)
      : (finalLocation.deals[this.state.dealIndex] = deal);

      this.props.save(finalLocation);

      this.setState({
        editingDeal: null,
        newDeal: false,
        locationDetails: finalLocation,
        errorMessage: '',
      });
      // this.props.savingCancelled();
    }
  };

  handleSaveCancel = () => {
    this.setState({ editingDeal: null, newDeal: false, errorMessage: '' });
    this.props.savingCancelled();
  };

  handleNewDeal = () => {
    this.setState({ newDeal: true, errorMessage: '' });
    this.props.edit();
  };

  render() {
    const dealsArray = this.state.locationDetails.deals;
    const editingDeal = (this.state.editingDeal || this.state.newDeal) && (
      <EditingDeal
        title={
          this.state.newDeal
            ? "Add New Deal"
            : "Edit Deal " + this.state.dealIndex
        }
        deal={this.state.editingDeal}
        confirm={this.handleSaveDeal}
        cancel={this.handleSaveCancel}
        newDeal={this.state.newDeal}
        errorMessage={this.state.errorMessage}
      />
    );
    return (
      <div className={classes.Deals}>
        <h1>Deals</h1>
        <Line classOverride="MainBody" />
        {dealsArray.map((deal, i) => {
          return (
            <div key={i}>
              <Deal
                deal={deal}
                editDeal={() => this.handleEditDeal(i)}
                removeDeal={() => this.handleRemoveDeal(i)}
              />
            </div>
          );
        })}

        <div className={classes.AddDealButton}>
          <Button btnType={"Add"} clicked={this.handleNewDeal}>
            Add New Deal
          </Button>
        </div>

        <Modal show={this.props.editing} modalClosed={this.handleSaveCancel}>
          {this.props.loading ? <Spinner /> : editingDeal}
        </Modal>
      </div>
    );
  }
}

export default Deals;
