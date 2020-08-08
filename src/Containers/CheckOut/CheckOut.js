import React from "react";
import CheckOutSummary from "../../Components/CheckOutSummary/CheckOutSummary";
import ContactData from "../CheckOut/ContactData/ContactData";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const checkOut=(props)=> {

  const checkOutContinueHandler = () => {
    props.history.replace("checkout/contact-data");
  };
 const checkOutCancelHandler = () => {
    props.history.goBack();
  };

    let summary =<Redirect to="/"/>
    if(props.ings){
      const purchasedRedirect = props.purchased? <Redirect to='/'/> : null
      summary =  ( <div>
        {purchasedRedirect}
      <CheckOutSummary
        ingredients={props.ings}
        checkOutContinued={checkOutContinueHandler}
        checkOutCancelled={checkOutCancelHandler}
      />
      <Route
        path={props.match.path + "/contact-data"}
        component={ContactData}
      />
    </div>)
    }
    return summary;
  
}

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    purchased: state.order.purchased
  };
};


export default connect(mapStateToProps)(checkOut);
