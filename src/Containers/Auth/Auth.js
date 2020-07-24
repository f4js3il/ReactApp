import React, { Component } from "react";
import Input from "../../Components/UI/Input/Input";
import Button from "../../Components/UI/Button/Button";
import classes from './Auth.css';
import * as actions from '../../store/actions/index';
import {connect} from 'react-redux';
import Spinner from '../../Components/UI/Spinner/Spinner';
import { Redirect } from 'react-router-dom';
import { updateObject, checkValidity } from "../../shared/utility";

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
    const updatedControls =updateObject(this.state.controls,{
      [inputIdentifier]:updateObject(this.state.controls[inputIdentifier] ,{
        value: event.target.value,
        valid: checkValidity(event.target.value,this.state.controls[inputIdentifier].validation),
        touched: true
      })
    })
    this.setState({controls: updatedControls});
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
          btnType="Danger">Switch to {this.state.isSignUp? 'SignIn' :'SignUp'}</Button>
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
