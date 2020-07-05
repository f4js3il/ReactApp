import React, { Component } from 'react';
import Layout from './Hoc/Layout/Layout';
import BurgerBuilder from './Containers/BurgerBuilder/BurgerBuilder';
import CheckOut from './Containers/CheckOut/CheckOut'
import {Route, Switch} from 'react-router-dom';
import Orders from './Containers/Orders/Orders';


class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Switch>
          <Route path="/" exact component={BurgerBuilder}></Route>
          <Route path="/checkout" component={CheckOut}></Route>
          <Route path="/orders" component={Orders}/>
          <Route  component={BurgerBuilder}></Route>
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
