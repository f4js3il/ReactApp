import React, { Component } from "react";
import Input from "../../Components/UI/Input/Input";
import Button from "../../Components/UI/Button/Button";
import classes from './Auth.css';
import * as actions from '../../store/actions/index';
import {connect} from 'react-redux';
import Spinner from '../../Components/UI/Spinner/Spinner';
import { Redirect } from 'react-router-dom';

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Enter Emailaddress",
        },
        value: "",
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        touched: false,
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Enter password",
        },
        value: "",
        validation: {
          required: true,
          minLength: 6,
        },
        valid: false,
        touched: false,
      },
    },
    isSignUp: true
  };
  
  componentDidMount(){
 
    if(!this.props.buildingBurger && this.props.authRedirect!=='/'){
      this.props.onSetAuthRedirectPath();
    }
  }

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedControls = {
        ...this.state.controls,
        [inputIdentifier]:{ ...this.state.controls[inputIdentifier],
            value: event.target.value,
            valid: this.checkValidity(event.target.value,this.state.controls[inputIdentifier].validation),
            touched: true
        },
    };
    this.setState({controls: updatedControls});
  }

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
    if(rules.isEmail){
      const pattern = /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      isValid = pattern.test(value) && isValid;
    }
    return isValid;
  }

  submitHandler =(event) =>{
    event.preventDefault();
    this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp);
  }

  switchAuthModeHandler = () =>{
      this.setState(prevState => {
          return {
              isSignUp : !prevState.isSignUp
          }
      })
  }
  render() {
    const formElementsArray = [];
    for (let key in this.state.controls) {
      formElementsArray.push({ id: key, config: this.state.controls[key] });
    }
    let form = formElementsArray.map((formElement) => (
      <Input
        key={formElement.id}
        changed={(event) => this.inputChangedHandler(event, formElement.id)}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        validation={formElement.config.validation}
        touched={formElement.config.touched}
        valid={formElement.config.valid}
        value={formElement.config.value}
      />
    ));

    if(this.props.loading){
        form =<Spinner/>;
    }
    let errorMessage = null;
    if(this.props.error){
       errorMessage =(<p>{this.props.error.message}</p>)
    }
    let redirect = null;
    if(this.props.isAuthenticated){
      redirect =<Redirect to={this.props.authRedirectPath}/>
    }
    return (
      <div className= {classes.Auth}>
        {redirect}
          {errorMessage}
        <form onSubmit={this.submitHandler}>
          {form}
          <Button btnType="Success">{this.state.isSignUp? 'SignUp' :'SignIn'}</Button>
        </form>
        <Button clicked = {this.switchAuthModeHandler} 
          btnType="Danger">Swith to {this.state.isSignUp? 'SignIn' :'SignUp'}</Button>
      </div>
    );
  }
}
const mapStateToProps =(state) =>{
    return{
      loading:  state.auth.loading,
      error: state.auth.error,
      token : state.auth.token,
      isAuthenticated : state.auth.token!==null,
      buildingBurger: state.burgerBuilder.building,
      authRedirectPath: state.auth.authRedirect
    }
}
const mapDispatchToProps =(dispatch) =>{
    return{
        onAuth : (email,passWord,isSignUp) => dispatch(actions.auth(email,passWord,isSignUp)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Auth);
