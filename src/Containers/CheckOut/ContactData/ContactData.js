import React, { Component } from "react";
import Button from "../../../Components/UI/Button/Button";
import classes from "./ContactData.css";
import Spinner from "../../../Components/UI/Spinner/Spinner";
import Aux from "../../../Hoc/Auxiliary/Auxiliary";
import Input from "../../../Components/UI/Input/Input";
import {connect} from 'react-redux';
import withErrorHandler from '../../../Hoc/WithErrorHandler/WithErrorHandler';
import axios from '../../../axios-orders';
import * as actions from '../../../store/actions/index';
import {updateObject, checkValidity } from '../../../shared/utility';

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Street",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Zip",
        },
        value: "",
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5,
        },
        valid: false,
        touched: false,
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Country",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your Email",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" },
          ],
        },
        value: "fastest",
        validation: {},
        valid: true
      },
    },
    isFormValid: false
  };
  orderHandler = (event) => {
    event.preventDefault();
  
    const customer = {};
    for (let key in this.state.orderForm) {
      customer[key] = this.state.orderForm[key].value;
    }
    const order = {
      ingredients: this.props.ings,
      price: this.props.price,
      customer: customer,
      userId: this.props.userId
    };
    this.props.onOrderBurger(order,this.props.token);
  };
  inputChangedHandler = (event, inputIdentifier) => {

  const updatedFormElement= updateObject(this.state.orderForm[inputIdentifier],{
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          this.state.orderForm[inputIdentifier].validation),
          touched: true
      }
    )

    const updatedOrderForm = updateObject(this.state.orderForm,{
      [inputIdentifier] : updatedFormElement
    })

    let isFormValid = true;
    for(let orderFormElement in updatedOrderForm ){
        isFormValid = updatedOrderForm[orderFormElement].valid && isFormValid
    }
    this.setState({ orderForm: updatedOrderForm, isFormValid: isFormValid });
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({ id: key, config: this.state.orderForm[key] });
    }

    let form = (
      <Aux>
        <h4>Enter your Contact Data</h4>
        <form>
          {formElementsArray.map((formElement) => (
            <Input
              key={formElement.id}
              changed={(event) =>
                this.inputChangedHandler(event, formElement.id)
              }
              elementType={formElement.config.elementType}
              elementConfig={formElement.config.elementConfig}
              validation={formElement.config.validation}
              touched={formElement.config.touched}
              valid={formElement.config.valid}
              value={formElement.config.value}
            />
          ))}
          <Button 
          btnType="Success" 
          disabled={!this.state.isFormValid}
          clicked={this.orderHandler}>
            Order
          </Button>
        </form>
      </Aux>
    );
    if (this.props.loading) {
      form = <Spinner />;
    }
    return <div className={classes.ContactData}>{form}</div>;
  }
}
const mapStateToProps =(state)=>{
return{
  ings : state.burgerBuilder.ingredients,
  price : state.burgerBuilder.price,
  loading: state.order.loading,
  token: state.auth.token,
  userId: state.auth.userId
  }
}

const mapDispatchToProps =(dispatch)=>{
  return{
    onOrderBurger: (orderData,token)=> dispatch(actions.purchaseBurger(orderData,token))
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(ContactData,axios));
