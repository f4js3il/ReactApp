import React, { Component } from "react";
import Button from "../../../Components/UI/Button/Button";
import classes from "./ContactData.css";
import axios from "../../../axios-orders";
import Spinner from "../../../Components/UI/Spinner/Spinner";
import Aux from "../../../Hoc/Auxiliary/Auxiliary";
import Input from "../../../Components/UI/Input/Input";

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
    loading: false,
    isFormValid: false
  };
  orderHandler = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const customer = {};
    for (let key in this.state.orderForm) {
      customer[key] = this.state.orderForm[key].value;
    }
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: customer,
    };
    axios
      .post("/orders.json", order)
      .then(() => {
        this.setState({ loading: false });
        this.props.history.push("/");
      })
      .catch(() => this.setState({ loading: false }));
  };
  inputChangedHandler = (event, inputIdentifier) => {
    const updatedOrderForm = { ...this.state.orderForm };
    const updatedFormElement = { ...updatedOrderForm[inputIdentifier] };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;
    updatedOrderForm[inputIdentifier] = updatedFormElement;
    let isFormValid = true;
    for(let orderFormElement in updatedOrderForm ){
        isFormValid = updatedOrderForm[orderFormElement].valid && isFormValid
    }
    console.log('form is valid',isFormValid);
    this.setState({ orderForm: updatedOrderForm, isFormValid: isFormValid });
  };

  checkValidity(value, rules) {
    let isValid = true;

    if (rules.required) {
      isValid = value !== "" && isValid;
    }
    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }
    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }
    return isValid;
  }

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
    if (this.state.loading) {
      form = <Spinner />;
    }
    return <div className={classes.ContactData}>{form}</div>;
  }
}

export default ContactData;