import React, { Component } from "react";
import CheckOutSummary from "../../Components/CheckOutSummary/CheckOutSummary";
import ContactData from "../CheckOut/ContactData/ContactData";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

class CheckOut extends Component {

  checkOutContinueHandler = () => {
    this.props.history.replace("checkout/contact-data");
  };
  checkOutCancelHandler = () => {
    this.props.history.goBack();
  };

  render() {
    let summary =<Redirect to="/"/>
    if(this.props.ings){
      const purchasedRedirect = this.props.purchased? <Redirect to='/'/> : null
      summary =  ( <div>
        {purchasedRedirect}
      <CheckOutSummary
        ingredients={this.props.ings}
        checkOutContinued={this.checkOutContinueHandler}
        checkOutCancelled={this.checkOutCancelHandler}
      />
      <Route
        path={this.props.match.path + "/contact-data"}
        component={ContactData}
      />
    </div>)
    }
    console.log("props in checkOut are", this.props);
    return summary;
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    purchased: state.order.purchased
  };
};


export default connect(mapStateToProps)(CheckOut);
