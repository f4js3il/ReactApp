import React, { Component } from 'react';
import Layout from './Hoc/Layout/Layout';
import BurgerBuilder from './Containers/BurgerBuilder/BurgerBuilder';
import CheckOut from './Containers/CheckOut/CheckOut'
import {Route, Switch} from 'react-router-dom';
import Orders from './Containers/Orders/Orders';
import Auth from './Containers/Auth/Auth';
import LogOut from './Containers/Auth/LogOut/LogOut';
import { connect } from 'react-redux';
import * as actions from './store/actions/index';


class App extends Component {
  componentDidMount(){
    this.props.onTryAutoSignup();
  }
  render() {
    return (
      <div>
        <Layout>
          <Switch>
          <Route path="/" exact component={BurgerBuilder}></Route>
          <Route path="/checkout" component={CheckOut}></Route>
          <Route path="/orders" component={Orders}/>
          <Route path="/auth" component={Auth}/>
          <Route path="/logOut" component={LogOut}/>
          <Route  component={BurgerBuilder}></Route>
          </Switch>
        </Layout>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) =>{
  return{
    onTryAutoSignup : ()=> dispatch(actions.authCheckState())
  }
}
export default connect(null, mapDispatchToProps)(App);
