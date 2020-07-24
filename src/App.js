import React, { Component } from 'react';
import Layout from './Hoc/Layout/Layout';
import BurgerBuilder from './Containers/BurgerBuilder/BurgerBuilder';
import {Route, Switch, Redirect} from 'react-router-dom';
import LogOut from './Containers/Auth/LogOut/LogOut';
import { connect } from 'react-redux';
import * as actions from './store/actions/index';
import asyncComponent from './Hoc/asyncComponent/asyncComponent';


const asyncCheckout = asyncComponent(()=>{
  return import ('./Containers/CheckOut/CheckOut');
});

const asyncOrders = asyncComponent(()=>{
  return import ('./Containers/Orders/Orders');
});

const asyncAuth = asyncComponent(()=>{
  return import ('./Containers/Auth/Auth');
});

class App extends Component {
  componentDidMount(){
    this.props.onTryAutoSignup();
  }
  render() {

    let routes  =(
      <Switch>
      <Route path="/" exact component={BurgerBuilder}></Route>
      <Route path="/auth" component={asyncAuth}/>
      <Redirect  to="/" />
      </Switch>
    );

    if(this.props.isAuthenticated){
      routes = (
        <Switch>
        <Route path="/" exact component={BurgerBuilder}></Route>
        <Route path="/auth" component={asyncAuth}/>
          <Route path="/checkout" component={asyncCheckout}></Route>
          <Route path="/orders" component={asyncOrders}/>
          <Route path="/logOut" component={LogOut}/>
          <Redirect  to="/" />
          </Switch>
      )

    }
    return (
      <div>
        <Layout>
      {routes}
        </Layout>
      </div>
    );
  }
}
const mapStateToProps =(state) =>{
  return{
    isAuthenticated: state.auth.token!=null
  }
}
const mapDispatchToProps = (dispatch) =>{
  return{
    onTryAutoSignup : ()=> dispatch(actions.authCheckState())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
