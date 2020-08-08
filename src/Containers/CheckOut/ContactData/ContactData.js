import React, { useState} from "react";
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

const contactData =(props) =>{
  const[orderForm, setOrderForm]= useState({
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
  });
const[  isFormValid, setIsFormValid] =useState(false);

 const  orderHandler = (event) => {
    event.preventDefault();
  
    const customer = {};
    for (let key in orderForm) {
      customer[key] = orderForm[key].value;
    }
    const order = {
      ingredients: props.ings,
      price: props.price,
      customer: customer,
      userId: props.userId
    };
    props.onOrderBurger(order,props.token);
  };

 const  inputChangedHandler = (event, inputIdentifier) => {

  const updatedFormElement= updateObject(orderForm[inputIdentifier],{
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
        orderForm[inputIdentifier].validation),
          touched: true
      }
    )

    const updatedOrderForm = updateObject(orderForm,{
      [inputIdentifier] : updatedFormElement
    })

    let isFormValided = true;
    for(let orderFormElement in updatedOrderForm ){
      isFormValided = updatedOrderForm[orderFormElement].valid && isFormValided
    }
    setOrderForm(updatedOrderForm);
    setIsFormValid(isFormValided);
  };

    const formElementsArray = [];
    for (let key in orderForm) {
      formElementsArray.push({ id: key, config: orderForm[key] });
    }

    let form = (
      <Aux>
        <h4>Enter your Contact Data</h4>
        <form>
          {formElementsArray.map((formElement) => (
            <Input
              key={formElement.id}
              changed={(event) =>
                inputChangedHandler(event, formElement.id)
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
          disabled={!isFormValid}
          clicked={orderHandler}>
            Order
          </Button>
        </form>
      </Aux>
    );
    if (props.loading) {
      form = <Spinner />;
    }
    return <div className={classes.ContactData}>{form}</div>;
  
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
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(contactData,axios));
