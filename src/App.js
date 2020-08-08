import React, { useEffect, Suspense } from 'react';
import Layout from './Hoc/Layout/Layout';
import BurgerBuilder from './Containers/BurgerBuilder/BurgerBuilder';
import {Route, Switch, Redirect} from 'react-router-dom';
import LogOut from './Containers/Auth/LogOut/LogOut';
import { connect } from 'react-redux';
import * as actions from './store/actions/index';



const Checkout = React.lazy(()=>{
  return import ('./Containers/CheckOut/CheckOut');
});

const Orders = React.lazy(()=>{
  return import ('./Containers/Orders/Orders');
});

const Auth = React.lazy(()=>{
  return import ('./Containers/Auth/Auth');
});

const app =(props) =>  {
  const {onTryAutoSignup} = props;

  useEffect(()=>{
    onTryAutoSignup();
  },[onTryAutoSignup]);

    let routes  =(
      <Switch>
      <Route path="/" exact component={BurgerBuilder}></Route>
      <Route path="/auth" render={(props)=><Auth {...props}/>}/>
      <Redirect  to="/" />
      </Switch>
    );

    if(props.isAuthenticated){
      routes = (
        <Switch>
        <Route path="/" exact component={BurgerBuilder}></Route>
        <Route path="/auth" render={(props)=><Auth {...props}/>}/>
          <Route path="/checkout" render={(props)=><Checkout {...props}/>}></Route>
          <Route path="/orders" render={(props)=><Orders {...props}/>}/>
          <Route path="/logOut" component={LogOut}/>
          <Redirect  to="/" />
          </Switch>
      )
     }
    
    return (
      <div>
        <Layout>
     <Suspense fallback={<p>Loading...</p>}>{routes}</Suspense> 
        </Layout>
      </div>
    );
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
export default connect(mapStateToProps, mapDispatchToProps)(app);
