import React, { useState, useEffect } from "react";
import Input from "../../Components/UI/Input/Input";
import Button from "../../Components/UI/Button/Button";
import classes from './Auth.css';
import * as actions from '../../store/actions/index';
import {connect} from 'react-redux';
import Spinner from '../../Components/UI/Spinner/Spinner';
import { Redirect } from 'react-router-dom';
import { updateObject, checkValidity } from "../../shared/utility";

const auth =(props)=>{

  const[authForm,setAuthForm] = useState({
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
  });

  const[isSignUp, setIsSignUp]= useState(true);

  const {buildingBurger,authRedirect,onSetAuthRedirectPath} = props

  useEffect(()=>{
    if(!buildingBurger && authRedirect!=='/'){
      onSetAuthRedirectPath();
    }
  },[buildingBurger,authRedirect,onSetAuthRedirectPath])
  

 const inputChangedHandler = (event, inputIdentifier) => {
    const updatedControls =updateObject(authForm,{
      [inputIdentifier]:updateObject(authForm[inputIdentifier] ,{
        value: event.target.value,
        valid: checkValidity(event.target.value,authForm[inputIdentifier].validation),
        touched: true
      })
    })
    setAuthForm(updatedControls);
  }

 const submitHandler =(event) =>{
    event.preventDefault();
    props.onAuth(authForm.email.value, authForm.password.value, isSignUp);
  }

const  switchAuthModeHandler = () =>{
  setIsSignUp(!isSignUp);
  }
  

    const formElementsArray = [];
    for (let key in authForm) {
      formElementsArray.push({ id: key, config: authForm[key] });
    }
    let form = formElementsArray.map((formElement) => (
      <Input
        key={formElement.id}
        changed={(event) => inputChangedHandler(event, formElement.id)}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        validation={formElement.config.validation}
        touched={formElement.config.touched}
        valid={formElement.config.valid}
        value={formElement.config.value}
      />
    ));

    if(props.loading){
        form =<Spinner/>;
    }
    let errorMessage = null;
    if(props.error){
       errorMessage =(<p>{props.error.message}</p>)
    }
    let redirect = null;
    if(props.isAuthenticated){
      redirect =<Redirect to={props.authRedirectPath}/>
    }
    return (
      <div className= {classes.Auth}>
        {redirect}
          {errorMessage}
        <form onSubmit={submitHandler}>
          {form}
          <Button btnType="Success">{isSignUp? 'SignUp' :'SignIn'}</Button>
        </form>
        <Button clicked = {switchAuthModeHandler} 
          btnType="Danger">Switch to {isSignUp? 'SignIn' :'SignUp'}</Button>
      </div>
    );
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
export default connect(mapStateToProps,mapDispatchToProps)(auth);
